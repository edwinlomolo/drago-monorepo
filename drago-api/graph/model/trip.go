package model

import (
	"encoding/json"

	"github.com/google/uuid"
)

type NewTripInput struct {
	PickupAddress  string    `json:"pickup_address"`
	DropoffAddress string    `json:"dropoff_address"`
	Pickup         Gps       `json:"pickup"`
	Dropoff        Gps       `json:"dropoff"`
	CourierID      uuid.UUID `json:"courier_id"`
	BusinessID     uuid.UUID `json:"business_id"`
}

type NewTrip struct {
	Pickup     string    `json:"pickup"`
	Dropoff    string    `json:"dropoff"`
	CourierID  uuid.UUID `json:"courier_id"`
	BusinessID uuid.UUID `json:"business_id"`
}

type point struct {
	Type        string    `json:"type"`
	Coordinates []float64 `json:"coordinates"`
}

func ParsePostgisLocation(v interface{}) *Gps {
	var p *point

	if v != nil {
		json.Unmarshal([]byte((v).(string)), &p)
		lat := &p.Coordinates[1]
		lng := &p.Coordinates[0]

		return &Gps{
			*lat,
			*lng,
		}
	} else {
		return &Gps{}
	}
}
