package repositories

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/postgres/db"
	"github.com/google/uuid"
)

var (
	ErrExpiredSession = errors.New("session expired")
)

type UserRepository struct {
	db *db.Queries
}

func (u *UserRepository) Init(db *db.Queries) {
	u.db = db
}

// Count - count users
func (u *UserRepository) CountUsers(ctx context.Context) (int, error) {
	total, err := u.db.CountUsers(ctx)
	if err != nil {
		return 0, err
	}

	return int(total), nil
}

// Create - create user
func (u *UserRepository) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	args := db.CreateUserParams{
		Firstname: input.Firstname,
		Lastname:  input.Lastname,
		Email:     input.Email,
	}

	// If user exists return it
	existingUser, err := u.GetUser(ctx, args.Email)
	if existingUser == nil && err == nil {
		// Create and return new one if not
		newUser, err := u.db.CreateUser(ctx, args)
		if err != nil {
			return nil, err
		}

		return &model.User{
			ID:        newUser.ID,
			Firstname: newUser.Firstname,
			Lastname:  newUser.Lastname,
			Email:     newUser.Email,
			CreatedAt: newUser.CreatedAt,
			UpdatedAt: newUser.UpdatedAt,
		}, nil
	}

	return existingUser, nil
}

func (u *UserRepository) GetUser(ctx context.Context, email string) (*model.User, error) {
	user, err := u.db.GetUser(ctx, email)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	return &model.User{
		ID:        user.ID,
		Firstname: user.Firstname,
		Lastname:  user.Lastname,
		Email:     user.Email,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}, nil
}

func (s *UserRepository) CreateSession(ctx context.Context, input model.NewSession) (*model.Session, error) {
	// If session exists return it
	session, err := s.GetSession(ctx, uuid.NullUUID{UUID: input.UserID, Valid: true})
	if (session == nil && err == nil) || (err != nil && errors.Is(err, ErrExpiredSession)) {
		// Create and return new one if not
		args := db.CreateSessionParams{
			UserID:    uuid.NullUUID{UUID: input.UserID, Valid: true},
			Ip:        sql.NullString{String: input.Ip, Valid: true},
			UserAgent: sql.NullString{String: input.UserAgent, Valid: true},
			Expired:   sql.NullTime{Time: input.Expired, Valid: true},
		}
		newS, err := s.db.CreateSession(ctx, args)
		if err != nil {
			return nil, err
		}

		return &model.Session{
			ID:        newS.ID,
			UserID:    newS.UserID.UUID,
			CreatedAt: newS.CreatedAt,
			UpdatedAt: newS.UpdatedAt,
		}, nil
	}

	return session, nil
}

func (s *UserRepository) FinishOnboarding(ctx context.Context, id uuid.UUID) (*model.Session, error) {
	session, err := s.db.FinishOnboarding(ctx, id)
	if err != nil {
		return nil, err
	}

	return &model.Session{
		ID:        session.ID,
		CreatedAt: session.CreatedAt,
		UpdatedAt: session.UpdatedAt,
	}, nil
}

func (s *UserRepository) GetSession(ctx context.Context, userID uuid.NullUUID) (*model.Session, error) {
	session, err := s.db.GetSession(ctx, userID)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	if time.Now().After(session.Expired.Time) {
		_, err := s.db.DestroySession(ctx, userID)
		if err != nil {
			return nil, err
		}

		return nil, ErrExpiredSession
	}

	return &model.Session{
		ID:        session.ID,
		Expired:   session.Expired.Time,
		UserID:    session.UserID.UUID,
		CreatedAt: session.CreatedAt,
		UpdatedAt: session.UpdatedAt,
	}, nil
}
