package config

import (
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

var (
	Configurations *configuration
	log            = logrus.New()
)

type configuration struct {
	Server   server
	Postgres postgres
	Sentry   sentry
	Jwt      Jwt
	Google   Google
	Ipinfo   Ipinfo
}

func New() {
	// Load environment variables into the application
	env()

	c := configuration{}

	c.Server = serverConfig()
	c.Postgres = postgresConfig()
	c.Sentry = sentryConfig()
	c.Jwt = jwtConfig()
	c.Google = googleConfig()
	c.Ipinfo = ipinfoConfig()

	Configurations = &c
}

func env() {
	godotenv.Load()
}

func serverConfig() server {
	var config server

	config.Env = strings.TrimSpace(os.Getenv("ENV"))
	config.Port = strings.TrimSpace(os.Getenv("PORT"))

	return config
}

func postgresConfig() postgres {
	var config postgres

	migrateTables, err := strconv.ParseBool(strings.TrimSpace(os.Getenv("MIGRATE_POSTGRES_TABLES")))
	if err != nil {
		log.WithError(err).Fatalln("server: reading MIGRATE_POSTGRES_TABLES environment var")
	}

	config.Driver = strings.TrimSpace(os.Getenv("POSTGRES_DATABASE_DRIVER"))
	config.Uri = strings.TrimSpace(os.Getenv("POSTGRES_DATABASE_URI"))
	config.MigrateTables = migrateTables
	config.MigrationFile = strings.TrimSpace(os.Getenv("POSTGRES_MIGRATION_FILE"))

	return config
}

func sentryConfig() sentry {
	var config sentry

	config.Dsn = strings.TrimSpace(os.Getenv("SENTRY_DSN"))

	return config
}

func jwtConfig() Jwt {
	var config Jwt

	expiration, err := time.ParseDuration(strings.TrimSpace(os.Getenv("JWTEXPIRES")))
	if err != nil {
		log.WithError(err).Fatalln("config: load JWTEXPIRES environment var")
	}

	config.Secret = strings.TrimSpace(os.Getenv("JWTSECRET"))
	config.Expires = expiration

	return config
}

func googleConfig() Google {
	var config Google

	config.GooglePlacesApiKey = strings.TrimSpace(os.Getenv("MAPS_PLACES_API_KEY"))
	config.GoogleRoutesApiKey = strings.TrimSpace(os.Getenv("MAPS_ROUTES_API_KEY"))
	config.GoogleCloudObjectBaseUri = strings.TrimSpace(os.Getenv("GOOGLE_CLOUD_OBJECT_BASE_URI"))
	config.GoogleApplicationDevelopmentCredentials = strings.TrimSpace(os.Getenv("GOOGLE_CLOUD_ADC"))
	config.GoogleCloudStorageBusinessDocumentsBucket = strings.TrimSpace(os.Getenv("GOOGLE_CLOUD_STORAGE_BUSINESS_DOCUMENTS_BUCKET"))

	return config
}

func ipinfoConfig() Ipinfo {
	var config Ipinfo

	config.ApiKey = strings.TrimSpace(os.Getenv("IPINFO_API_KEY"))

	return config
}
