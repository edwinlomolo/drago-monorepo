package repositories

import (
	"context"
	"encoding/json"
	"fmt"
	"math"

	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/postgres/db"
	"github.com/google/uuid"
)

type TripRepository struct {
	db *db.Queries
}

func (t *TripRepository) Init(db *db.Queries) {
	t.db = db
}

func (t *TripRepository) CreateTrip(ctx context.Context, input model.NewTripInput) (*model.Trip, error) {
	args := db.CreateTripParams{
		PickupAddress:  input.PickupAddress,
		DropoffAddress: input.DropoffAddress,
		Pickup:         fmt.Sprintf("SRID=4326;POINT(%.8f %.8f)", input.Pickup.Lat, input.Pickup.Lng),
		Dropoff:        fmt.Sprintf("SRID=4326;POINT(%.8f %.8f)", input.Dropoff.Lat, input.Dropoff.Lng),
		CourierID:      uuid.NullUUID{UUID: input.CourierID, Valid: true},
		BusinessID:     input.BusinessID,
	}
	trip, err := t.db.CreateTrip(ctx, args)
	if err != nil {
		return nil, err
	}

	return &model.Trip{
		ID:        trip.ID,
		CreatedAt: trip.CreatedAt,
		UpdatedAt: trip.UpdatedAt,
	}, nil
}

func (t *TripRepository) GetTripsBelongingToBusiness(ctx context.Context, userID uuid.UUID) ([]*model.Trip, error) {
	user, err := t.db.GetUserByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	if user.Metadata == nil {
		return make([]*model.Trip, 0), nil
	}

	userMetadata := model.UserMetadata{}
	json.Unmarshal(user.Metadata, &userMetadata)

	bT, err := t.db.GetTripsBelongingToBusiness(ctx, userMetadata.DefaultBusiness)
	if err != nil {
		return nil, err
	}

	var trips []*model.Trip
	for _, trip := range bT {
		d := math.Round((trip.Distance).(float64))
		t := &model.Trip{
			ID:             trip.ID,
			Status:         model.TripStatus(trip.Status),
			DropoffAddress: trip.DropoffAddress,
			PickupAddress:  trip.PickupAddress,
			Pickup:         model.ParsePostgisLocation(trip.Pickup),
			Distance:       toKM(d),
			Dropoff:        model.ParsePostgisLocation(trip.Dropoff),
			CourierID:      &trip.CourierID.UUID,
			CreatedAt:      trip.CreatedAt,
			UpdatedAt:      trip.UpdatedAt,
		}

		trips = append(trips, t)
	}

	return trips, nil
}

func (t *TripRepository) GetTripCourier(ctx context.Context, ID uuid.UUID) (*model.Courier, error) {
	c, err := t.db.GetCourierByID(ctx, ID)
	if err != nil {
		return nil, err
	}

	return &model.Courier{
		ID:        c.ID,
		Firstname: c.Firstname,
		Lastname:  c.Lastname,
		Phone:     c.Phone,
		CreatedAt: c.CreatedAt,
		UpdatedAt: c.UpdatedAt,
	}, nil
}
