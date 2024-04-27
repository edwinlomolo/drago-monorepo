package logger

import (
	"time"

	"github.com/edwinlomolo/drago-api/config"
	"github.com/getsentry/sentry-go"
	logrusSentry "github.com/getsentry/sentry-go/logrus"
	"github.com/sirupsen/logrus"
)

var log = logrus.New()

func New() *logrus.Logger {
	// Sentry error reporting
	if isProd() {
		// Error level to report
		levels := sentryLoggingLevels()
		hook, err := logrusSentry.New(levels, sentry.ClientOptions{
			Dsn:              config.Configurations.Sentry.Dsn,
			AttachStacktrace: true,
		})
		if err != nil {
			logrus.WithError(err).Fatalln("sentry hook")
		}

		log.AddHook(hook)

		defer hook.Flush(5 * time.Second)
		logrus.RegisterExitHandler(func() { hook.Flush(5 * time.Second) })
	}

	return log
}

func GetLogger() *logrus.Logger {
	return log
}

func isProd() bool {
	return config.Configurations.Server.Env == "production" ||
		config.Configurations.Server.Env == "staging"
}

func sentryLoggingLevels() []logrus.Level {
	levels := []logrus.Level{
		logrus.PanicLevel,
		logrus.ErrorLevel,
		logrus.FatalLevel,
	}

	return levels
}
