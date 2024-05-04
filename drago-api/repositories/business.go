package repositories

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/postgres/db"
	"github.com/google/uuid"
)

type BusinessRepository struct {
	db *db.Queries
}

func (b *BusinessRepository) Init(db *db.Queries) {
	b.db = db
}

// CreateBusiness - create business
func (b *BusinessRepository) CreateBusiness(ctx context.Context, input model.NewBusinessInput) (*model.Business, error) {
	args := db.CreateBusinessParams{
		BusinessType:       input.BusinessType,
		Name:               input.Name,
		HasInHouseLogistic: input.HasInHouseLogistic,
		DateCreated:        input.DateCreated,
		UserID:             input.UserID,
		Location:           fmt.Sprintf("SRID=4326;POINT(%.8f %.8f)", input.Location.Lat, input.Location.Lng),
		Phone:              input.Phone,
		Logo:               input.Logo,
	}

	business, err := b.db.CreateBusiness(ctx, args)
	if err != nil {
		return nil, err
	}

	// Set default user business if this is the first business created
	user, err := b.db.GetUserByID(ctx, input.UserID)
	if err != nil {
		return nil, err
	}

	if user.Metadata == nil {
		_, updateErr := b.db.UpdateUserDefaultBusiness(ctx, db.UpdateUserDefaultBusinessParams{
			ID:         user.ID,
			BusinessID: json.RawMessage(fmt.Sprintf("%q", business.ID.String())),
		})
		if updateErr != nil {
			return nil, updateErr
		}
	}

	return &model.Business{
		ID:                 business.ID,
		Name:               business.Name,
		Logo:               business.Logo,
		DateCreated:        business.DateCreated,
		HasInHouseLogistic: business.HasInHouseLogistic,
		CreatedAt:          business.CreatedAt,
		UpdatedAt:          business.UpdatedAt,
	}, nil
}

// GetBusinessBelongingToUser - get businesss for user given user ID
func (b *BusinessRepository) GetBusinessBelongingToUser(ctx context.Context, userID uuid.UUID) ([]*model.Business, error) {
	var businesses []*model.Business
	bs, err := b.db.GetBusinessBelongingToUser(ctx, userID)
	if err != nil {
		return nil, err
	}

	for _, business := range bs {
		pt := &model.Business{
			ID:                 business.ID,
			Name:               business.Name,
			Logo:               business.Logo,
			BusinessType:       business.BusinessType,
			Phone:              business.Phone,
			DateCreated:        business.DateCreated,
			HasInHouseLogistic: business.HasInHouseLogistic,
			Location:           model.ParsePostgisLocation(business.Location),
			CreatedAt:          business.CreatedAt,
			UpdatedAt:          business.UpdatedAt,
		}

		businesses = append(businesses, pt)
	}

	return businesses, nil
}

// Create business courier
func (b *BusinessRepository) CreateCourier(ctx context.Context, input model.NewCourierInput) (*model.Courier, error) {
	c, err := b.GetCourierByPhone(ctx, input.Phone)
	if c == nil && err == nil {
		args := db.CreateCourierParams{
			Firstname:  input.Firstname,
			Lastname:   input.Lastname,
			Phone:      input.Phone,
			BusinessID: input.BusinessID,
			Status:     input.Status,
			Verified:   false,
		}
		newC, err := b.db.CreateCourier(ctx, args)
		if err != nil {
			return nil, err
		}

		return &model.Courier{
			ID:        newC.ID,
			Verified:  newC.Verified,
			Status:    model.CourierStatus(newC.Status),
			CreatedAt: newC.CreatedAt,
			UpdatedAt: newC.UpdatedAt,
		}, nil
	}

	return c, nil
}

// Get business courier by phone
func (b *BusinessRepository) GetCourierByPhone(ctx context.Context, phone string) (*model.Courier, error) {
	c, err := b.db.GetCourierByPhone(ctx, phone)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	return &model.Courier{
		ID:         c.ID,
		Status:     model.CourierStatus(c.Status),
		BusinessID: c.BusinessID,
		Verified:   c.Verified,
		CreatedAt:  c.CreatedAt,
		UpdatedAt:  c.UpdatedAt,
	}, nil
}

// Get business couriers
func (b *BusinessRepository) GetBusinessCouriers(ctx context.Context, userID uuid.UUID) ([]*model.Courier, error) {
	// From default user business(currently selected)
	user, err := b.db.GetUserByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	if user.Metadata == nil {
		return make([]*model.Courier, 0), nil
	}

	userMetadata := model.UserMetadata{}
	json.Unmarshal(user.Metadata, &userMetadata)

	c, err := b.db.GetBusinessCouriers(ctx, userMetadata.DefaultBusiness)
	if err != nil {
		return nil, err
	}

	var couriers []*model.Courier
	for _, courier := range c {
		cr := &model.Courier{
			ID:        courier.ID,
			Firstname: courier.Firstname,
			Lastname:  courier.Lastname,
			Phone:     courier.Phone,
			Verified:  courier.Verified,
			Status:    model.CourierStatus(courier.Status),
			CreatedAt: courier.CreatedAt,
			UpdatedAt: courier.UpdatedAt,
		}

		couriers = append(couriers, cr)
	}

	return couriers, nil
}
