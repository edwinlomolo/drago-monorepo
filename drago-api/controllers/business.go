package controllers

import (
	"context"

	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/postgres/db"
	"github.com/edwinlomolo/drago-api/repositories"
	"github.com/google/uuid"
)

type BusinessController struct {
	r repositories.BusinessRepository
}

func (bc *BusinessController) Init(db *db.Queries) {
	bc.r = repositories.BusinessRepository{}
	bc.r.Init(db)
}

// Create partner
func (bc *BusinessController) CreateBusiness(ctx context.Context, input model.NewBusinessInput) (*model.Business, error) {
	return bc.r.CreateBusiness(ctx, input)
}

// Get business belonging to user
func (bc *BusinessController) GetBusinessBelongingToUser(ctx context.Context, ID uuid.UUID) ([]*model.Business, error) {
	return bc.r.GetBusinessBelongingToUser(ctx, ID)
}

// Create business courier
func (bc *BusinessController) CreateBusinessCourier(ctx context.Context, input model.NewCourierInput) (*model.Courier, error) {
	input.Status = model.CourierStatusOffline.String()
	input.Verified = false
	return bc.r.CreateCourier(ctx, input)
}

// Get business couriers
func (bc *BusinessController) GetBusinessCouriers(ctx context.Context, ID uuid.UUID) ([]*model.Courier, error) {
	return bc.r.GetBusinessCouriers(ctx, ID)
}
