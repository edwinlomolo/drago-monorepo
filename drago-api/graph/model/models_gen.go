// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
	"time"

	"github.com/google/uuid"
)

type Courier struct {
	ID         uuid.UUID     `json:"id"`
	Firstname  string        `json:"firstname"`
	Lastname   string        `json:"lastname"`
	Phone      string        `json:"phone"`
	Verified   bool          `json:"verified"`
	Status     CourierStatus `json:"status"`
	BusinessID uuid.UUID     `json:"business_id"`
	UserID     uuid.UUID     `json:"user_id"`
	CreatedAt  time.Time     `json:"created_at"`
	UpdatedAt  time.Time     `json:"updated_at"`
}

type Gps struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

type Mutation struct {
}

type Query struct {
}

type SetDefaultUserBusiness struct {
	UserID     uuid.UUID `json:"userId"`
	BusinessID uuid.UUID `json:"businessId"`
}

type Trip struct {
	ID             uuid.UUID  `json:"id"`
	DropoffAddress string     `json:"dropoff_address"`
	Pickup         *Gps       `json:"pickup"`
	Dropoff        *Gps       `json:"dropoff"`
	Distance       string     `json:"distance"`
	Status         TripStatus `json:"status"`
	Cost           *int       `json:"cost,omitempty"`
	CourierID      *uuid.UUID `json:"courier_id,omitempty"`
	Courier        *Courier   `json:"courier"`
	CreatedAt      time.Time  `json:"created_at"`
	UpdatedAt      time.Time  `json:"updated_at"`
}

type CourierStatus string

const (
	CourierStatusOnboarding CourierStatus = "ONBOARDING"
	CourierStatusOffline    CourierStatus = "OFFLINE"
	CourierStatusOnline     CourierStatus = "ONLINE"
)

var AllCourierStatus = []CourierStatus{
	CourierStatusOnboarding,
	CourierStatusOffline,
	CourierStatusOnline,
}

func (e CourierStatus) IsValid() bool {
	switch e {
	case CourierStatusOnboarding, CourierStatusOffline, CourierStatusOnline:
		return true
	}
	return false
}

func (e CourierStatus) String() string {
	return string(e)
}

func (e *CourierStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CourierStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CourierStatus", str)
	}
	return nil
}

func (e CourierStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type TripStatus string

const (
	TripStatusCreated         TripStatus = "CREATED"
	TripStatusCourierArriving TripStatus = "COURIER_ARRIVING"
	TripStatusCourierEnRoute  TripStatus = "COURIER_EN_ROUTE"
	TripStatusCancelled       TripStatus = "CANCELLED"
	TripStatusCompleted       TripStatus = "COMPLETED"
)

var AllTripStatus = []TripStatus{
	TripStatusCreated,
	TripStatusCourierArriving,
	TripStatusCourierEnRoute,
	TripStatusCancelled,
	TripStatusCompleted,
}

func (e TripStatus) IsValid() bool {
	switch e {
	case TripStatusCreated, TripStatusCourierArriving, TripStatusCourierEnRoute, TripStatusCancelled, TripStatusCompleted:
		return true
	}
	return false
}

func (e TripStatus) String() string {
	return string(e)
}

func (e *TripStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = TripStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid TripStatus", str)
	}
	return nil
}

func (e TripStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
