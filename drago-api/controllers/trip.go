package controllers

import (
	"context"

	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/postgres/db"
	"github.com/edwinlomolo/drago-api/repositories"
	"github.com/google/uuid"
)

type TripController struct {
	t repositories.TripRepository
}

func (tc *TripController) Init(db *db.Queries) {
	tc.t = repositories.TripRepository{}
	tc.t.Init(db)
}

func (tc *TripController) CreateTrip(ctx context.Context, input model.NewTripInput) (*model.Trip, error) {
	return tc.t.CreateTrip(context.Background(), input)
}

func (tc *TripController) GetTripsBelongingToBusiness(ctx context.Context, businessID uuid.UUID) ([]*model.Trip, error) {
	return tc.t.GetTripsBelongingToBusiness(ctx, businessID)
}

func (tc *TripController) GetTripCourier(ctx context.Context, ID uuid.UUID) (*model.Courier, error) {
	return tc.t.GetTripCourier(ctx, ID)
}
