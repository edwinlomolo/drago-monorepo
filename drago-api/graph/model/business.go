package model

import (
	"time"

	"github.com/google/uuid"
)

type NewBusinessInput struct {
	BusinessType       string    `json:"businessType"`
	Name               string    `json:"name"`
	Phone              string    `json:"phone"`
	Logo               string    `json:"logo"`
	HasInHouseLogistic bool      `json:"hasInHouseLogistic"`
	DateCreated        time.Time `json:"dateCreated"`
	UserID             uuid.UUID `json:"userId"`
	Location           Gps       `json:"location"`
}

type Business struct {
	ID                 uuid.UUID `json:"id"`
	BusinessType       string    `json:"businessType"`
	Name               string    `json:"name"`
	Phone              string    `json:"phone"`
	HasInHouseLogistic bool      `json:"hasInHouseLogistic"`
	Location           *Gps      `json:"location"`
	DateCreated        time.Time `json:"dateCreated"`
	Logo               string    `json:"logo"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
}
