package middleware

import (
	"net/http"

	"github.com/edwinlomolo/drago-api/config"
	sentryHttp "github.com/getsentry/sentry-go/http"
)

func SentryHttp(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if isProd() {
			sentryHttp.New(sentryHttp.Options{}).Handle(next).ServeHTTP(w, r)
		} else {
			next.ServeHTTP(w, r)
		}
	})
}

func isProd() bool {
	return config.Configurations.Server.Env == "production" ||
		config.Configurations.Server.Env == "staging"
}
