package model

import (
	"time"

	"github.com/google/uuid"
)

type NewSession struct {
	UserID    uuid.UUID `json:"user_id"`
	Ip        string    `json:"ip"`
	UserAgent string    `json:"user_agent"`
	Expired   time.Time `json:"expired"`
}

type Session struct {
	ID        uuid.UUID `json:"id"`
	UserAgent string    `json:"user_agent"`
	Ip        string    `json:"ip"`
	Expired   time.Time `json:"expired"`
	UserID    uuid.UUID `json:"user_id"`
	Token     string    `json:"token"`
	Location  Gps       `json:"location"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
