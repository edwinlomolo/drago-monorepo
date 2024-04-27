package model

import "github.com/google/uuid"

type NewCourierInput struct {
	Firstname  string    `json:"firstname"`
	Lastname   string    `json:"lastname"`
	Phone      string    `json:"phone"`
	Verified   bool      `json:"verified"`
	Status     string    `json:"status"`
	BusinessID uuid.UUID `json:"business_id"`
}
