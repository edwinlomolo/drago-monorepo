package test

import (
	"context"
	"testing"
	"time"

	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_BusinessController(t *testing.T) {
	ctx := context.Background()
	defer dB.ClearTestUsers(ctx)
	defer dB.ClearTestBusinesses(ctx)
	defer dB.ClearTestCouriers(ctx)

	businessController := businessC()
	userController := userC()
	session, err := userController.SignIn(ctx, newUser())
	require.Nil(t, err)
	var businessId uuid.UUID

	inceptionDate1, err := time.Parse(time.DateOnly, "2020-11-04")
	require.Nil(t, err)
	inceptionDate2, err := time.Parse(time.DateOnly, "2008-05-01")
	require.Nil(t, err)
	b := []model.NewBusinessInput{
		{
			Name:               "Jiji waters",
			BusinessType:       "business",
			HasInHouseLogistic: false,
			Phone:              "254700200900",
			DateCreated:        inceptionDate1,
			UserID:             session.UserID,
			Location:           model.Gps{Lat: 1.302984, Lng: 36.7483},
			Logo:               "https://img.logo.png",
		},
	}

	for _, tt := range b {
		t.Run("create_partner_business", func(t *testing.T) {
			business, err := businessController.CreateBusiness(ctx, tt)
			require.Nil(t, err)
			require.NotNil(t, business)
		})
	}

	lsp := []model.NewBusinessInput{
		{
			Name:               "Last-mile ltd",
			BusinessType:       "lsp",
			HasInHouseLogistic: true,
			Phone:              "254700200901",
			UserID:             session.UserID,
			DateCreated:        inceptionDate2,
			Location:           model.Gps{Lat: 1.37334, Lng: 36.22832},
			Logo:               "https://img.logo.png",
		},
	}

	for _, tt := range lsp {
		t.Run("create_logistics_service_provider", func(t *testing.T) {
			business, err := businessController.CreateBusiness(ctx, tt)
			require.Nil(t, err)
			require.NotNil(t, business)
		})
	}

	t.Run("get_businesses_belonging_to_user", func(t *testing.T) {
		businesses, err := businessController.GetBusinessBelongingToUser(ctx, session.UserID)
		require.Nil(t, err)
		assert.Equal(t, len(businesses), 2, "user should have 2 business")
	})

	couriers := []model.NewCourierInput{
		{
			Firstname: "john",
			Lastname:  "doe",
			Phone:     "25470002001",
			Verified:  true,
			Status:    model.CourierStatusOffline.String(),
		},
	}
	for _, tt := range couriers {
		t.Run("add_business_courier", func(t *testing.T) {
			inceptionDate, err := time.Parse(time.DateOnly, "2005-05-05")
			require.Nil(t, err)

			b := model.NewBusinessInput{
				Name:               "Last-mile ltd",
				BusinessType:       "lsp",
				HasInHouseLogistic: true,
				Phone:              "254700200902",
				DateCreated:        inceptionDate,
				Location:           model.Gps{Lat: -1.3909, Lng: 36.00009},
				UserID:             session.UserID,
				Logo:               "https://img.logo.png",
			}
			business, err := businessController.CreateBusiness(ctx, b)
			require.Nil(t, err)
			tt.BusinessID = business.ID
			businessId = business.ID

			c, err := businessController.CreateBusinessCourier(ctx, tt)
			require.Nil(t, err)
			require.NotNil(t, c)
		})
	}

	t.Run("get_business_couriers", func(t *testing.T) {
		couriers, err := businessController.GetBusinessCouriers(ctx, businessId)
		require.Nil(t, err)
		assert.Equal(t, len(couriers), 1)
	})

	t.Run("set_default_user_business", func(t *testing.T) {
		user, err := userController.SetDefaultBusiness(ctx, session.UserID, businessId)
		require.Nil(t, err)
		require.NotNil(t, user)
		require.Equal(t, user.Metadata.DefaultBusiness, businessId)
	})
}
