package internal

import (
	"context"

	"github.com/edwinlomolo/drago-api/config"
	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/logger"
	"googlemaps.github.io/maps"
)

type LocationService interface {
	GetPlaceDetails(ctx context.Context, placeID string) (*model.Location, error)
}

type locationClient struct {
	places *maps.Client
}

func NewLocationService(opt config.Google) LocationService {
	log := logger.GetLogger()
	p, err := maps.NewClient(maps.WithAPIKey(opt.GooglePlacesApiKey))
	if err != nil {
		log.WithError(err).Fatalln("google: new places api client")
	}
	return &locationClient{p}
}

func (l locationClient) GetPlaceDetails(ctx context.Context, placeId string) (*model.Location, error) {
	var place *model.Location

	req := &maps.PlaceDetailsRequest{
		PlaceID: placeId,
		Fields:  []maps.PlaceDetailsFieldMask{"geometry", "formatted_address"},
	}

	res, err := l.places.PlaceDetails(ctx, req)
	if err != nil {
		return nil, err
	}

	place = &model.Location{
		FormattedAddress: res.FormattedAddress,
		Coords: model.Gps{
			Lat: res.Geometry.Location.Lat,
			Lng: res.Geometry.Location.Lng,
		},
	}

	return place, nil
}
