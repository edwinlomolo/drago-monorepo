package test

import (
	"time"

	"github.com/edwinlomolo/drago-api/config"
	"github.com/edwinlomolo/drago-api/controllers"
	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/internal"
	"github.com/edwinlomolo/drago-api/postgres"
	"github.com/edwinlomolo/drago-api/postgres/db"
	"github.com/sirupsen/logrus"
)

var (
	log = logrus.New()
	dB  *db.Queries
)

func init() {
	internal.NewJwtService(
		config.Jwt{
			Secret:  "X1C9FVAkNZpY5CN8eCry5I9GBwMOmdUUZP4dndlFkdd8kPYaKSJbkJfsmXmEz1MOdbWJs0LsPVugLMlY7q48YYcPZZHsvMXNDJmymMShttaPQ4XGkErqQAkLrtmlf0sQ",
			Expires: time.Duration(time.Minute),
		},
	)
	// Setup testing database
	dB = postgres.Init(postgres.ConnectionOptions{
		Driver:        "postgres",
		Uri:           "postgres://postgres:demo1234@localhost:5432/dragotest?sslmode=disable",
		MigrationFile: "file://../postgres/migration",
		MigrateTables: true,
	})
}

func userC() controllers.UserController {
	userController := controllers.UserController{}
	userController.Init(dB)

	return userController
}

func businessC() controllers.BusinessController {
	businessController := controllers.BusinessController{}
	businessController.Init(dB)

	return businessController
}

func tripC() controllers.TripController {
	tripController := controllers.TripController{}
	tripController.Init(dB)

	return tripController
}

func newUser() model.SignIn {
	return model.SignIn{
		NewUser: model.NewUser{
			Firstname: "john",
			Lastname:  "doe",
			Email:     "john@email.com",
			UserAgent: "Mozilla/Browser",
			Ip:        "127.0.0.1",
		},
	}
}
