package model

import (
	"time"

	"github.com/google/uuid"
)

type NewUser struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Email     string `json:"email"`
	Ip        string `json:"ip"`
	UserAgent string `json:"user_agent"`
}

type SignIn struct {
	NewUser
}

type User struct {
	ID         uuid.UUID `json:"id"`
	Firstname  string    `json:"firstname"`
	Lastname   string    `json:"lastname"`
	Email      string    `json:"email"`
	Onboarding bool      `json:"onboarding"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
