package middleware

import (
	"net/http"

	"github.com/edwinlomolo/drago-api/logger"
)

var log = logger.GetLogger()

func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Infof("%s %s %s %s %s", r.UserAgent(), r.RemoteAddr, r.Method, r.URL, r.Proto)
		next.ServeHTTP(w, r)
	})
}
