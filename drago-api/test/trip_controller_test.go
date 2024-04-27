package test

import (
	"context"
	"testing"
	"time"

	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_TripController(t *testing.T) {
	ctx := context.Background()
	defer dB.ClearTestTrips(ctx)
	defer dB.ClearTestUsers(ctx)
	defer dB.ClearTestBusinesses(ctx)
	defer dB.ClearTestCouriers(ctx)

	userController := userC()
	businessController := businessC()
	// create session
	session, err := userController.SignIn(ctx, newUser())
	require.Nil(t, err)
	tripController := tripC()
	// create business
	inceptionDate, err := time.Parse(time.DateOnly, "1995-05-04")
	require.Nil(t, err)
	b := model.NewBusinessInput{
		Name:               "Last-mile ltd",
		BusinessType:       "lsp",
		HasInHouseLogistic: true,
		Phone:              "254700200902",
		DateCreated:        inceptionDate,
		Location:           model.Gps{Lat: 1.37454, Lng: 36.7432},
		UserID:             session.UserID,
		Logo:               "https://img.logo.png",
	}
	business, err := businessController.CreateBusiness(ctx, b)
	require.Nil(t, err)
	// create courier
	c := model.NewCourierInput{
		Firstname:  "john",
		Lastname:   "doe",
		Phone:      "25470002001",
		Verified:   true,
		Status:     model.CourierStatusOffline.String(),
		BusinessID: business.ID,
	}
	courier, err := businessController.CreateBusinessCourier(ctx, c)
	require.Nil(t, err)

	trips := []model.NewTripInput{
		{
			PickupAddress:  "Somewhere pickup where street",
			DropoffAddress: "Somewhere dropoff, street",
			Pickup:         model.Gps{Lat: -1.00334, Lng: 36.83892},
			Dropoff:        model.Gps{Lat: -1.1193, Lng: 36.0009},
			CourierID:      courier.ID,
			BusinessID:     business.ID,
		},
		{
			PickupAddress:  "Somewhere pickup, street",
			DropoffAddress: "Somewhere dropoff, street",
			Pickup:         model.Gps{Lat: -1.9724, Lng: 36.19293},
			Dropoff:        model.Gps{Lat: -1.22984, Lng: 36.22864},
			CourierID:      courier.ID,
			BusinessID:     business.ID,
		},
	}

	for _, tt := range trips {
		t.Run("create_trip", func(t *testing.T) {
			ctx := context.Background()
			trip, err := tripController.CreateTrip(ctx, tt)
			require.Nil(t, err)
			require.NotNil(t, trip)
		})
	}

	t.Run("get_trip_belonging_to_business", func(t *testing.T) {
		trips, err := tripController.GetTripsBelongingToBusiness(ctx, business.ID)
		assert.Equal(t, len(trips), 2, "business created 2 trip(s)")
		require.Nil(t, err)
	})

	t.Run("get_trip_courier", func(t *testing.T) {
		cr, err := tripController.GetTripCourier(ctx, courier.ID)
		require.Nil(t, err)
		require.NotNil(t, cr)

		assert.Equal(t, cr.Firstname, "john", "courier firstname should match")
		assert.Equal(t, cr.Lastname, "doe", "courier lastnames should match")
	})
}
