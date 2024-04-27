package graph

import (
	"github.com/edwinlomolo/drago-api/config"
	"github.com/edwinlomolo/drago-api/controllers"
	"github.com/edwinlomolo/drago-api/dataloaders"
	"github.com/edwinlomolo/drago-api/internal"
	"github.com/edwinlomolo/drago-api/postgres/db"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	uc controllers.UserController
	bc controllers.BusinessController
	tc controllers.TripController
	l  internal.LocationService
	ld *dataloaders.Loaders
	ip internal.Ipinfo
}

func New(db *db.Queries, uc controllers.UserController) Config {
	bc := controllers.BusinessController{}
	bc.Init(db)

	tc := controllers.TripController{}
	tc.Init(db)

	l := internal.NewLocationService(config.Configurations.Google)

	c := Config{Resolvers: &Resolver{
		uc,
		bc,
		tc,
		l,
		dataloaders.NewLoaders(db),
		internal.NewIpClient(internal.ClientOption{ApiKey: config.Configurations.Ipinfo.ApiKey}),
	}}

	return c
}
