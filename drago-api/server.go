package main

import (
	"fmt"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/edwinlomolo/drago-api/config"
	"github.com/edwinlomolo/drago-api/controllers"
	"github.com/edwinlomolo/drago-api/graph"
	dragoHandler "github.com/edwinlomolo/drago-api/handler"
	"github.com/edwinlomolo/drago-api/internal"
	"github.com/edwinlomolo/drago-api/logger"
	dragoMiddleware "github.com/edwinlomolo/drago-api/middleware"
	"github.com/edwinlomolo/drago-api/postgres"
	"github.com/getsentry/sentry-go"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"
)

func main() {
	// Services setup
	config.New()
	log := logger.New()
	internal.NewJwtService(config.Configurations.Jwt)
	internal.NewIpClient(internal.ClientOption{ApiKey: config.Configurations.Ipinfo.ApiKey})

	// For some service activation
	isProd := func() bool {
		return config.Configurations.Server.Env == "production" ||
			config.Configurations.Server.Env == "staging"
	}

	// Cors
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://drago-web.vercel.app"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST"},
	})

	// Sentry initialization
	if isProd() {
		if err := sentry.Init(sentry.ClientOptions{
			Dsn:           config.Configurations.Sentry.Dsn,
			EnableTracing: true,
			// Set to 1.0 to capture 100%
			// of txs for performance monitoring
			TracesSampleRate: 1.0,
		}); err != nil {
			log.Fatalln(err)
		}
	}

	// Setup postgres database
	db := postgres.Init(postgres.ConnectionOptions{
		Driver:        config.Configurations.Postgres.Driver,
		Uri:           config.Configurations.Postgres.Uri,
		MigrateTables: config.Configurations.Postgres.MigrateTables,
		MigrationFile: config.Configurations.Postgres.MigrationFile,
	})

	// Setup controllers
	userController := controllers.UserController{}
	userController.Init(db)

	// New graphql server
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.New(db, userController)))

	// New server routing
	r := chi.NewRouter()
	// Default middlewares
	r.Use(c.Handler)
	r.Use(middleware.RealIP)
	r.Use(dragoMiddleware.Logger)
	r.Use(dragoMiddleware.SentryHttp)

	// Route handlers
	r.Route("/api", func(r chi.Router) {
		r.With(dragoMiddleware.Auth).Handle("/graphql", srv)
		r.Post("/signin", dragoHandler.SignIn(userController))
	})
	r.Get("/", playground.Handler("Graphql playground", "/api/graphql"))

	// New drago-api server
	s := &http.Server{
		Addr:    fmt.Sprintf("0.0.0.0:%s", config.Configurations.Server.Port),
		Handler: r,
	}
	log.Fatalln(s.ListenAndServe())
}
