package controllers

import (
	"context"
	"time"

	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/internal"
	"github.com/edwinlomolo/drago-api/postgres/db"
	"github.com/edwinlomolo/drago-api/repositories"
	"github.com/google/uuid"
)

type UserController struct {
	userRepository *repositories.UserRepository
	jwt            internal.Jwt
}

func (u *UserController) Init(db *db.Queries) {
	u.userRepository = &repositories.UserRepository{}
	u.userRepository.Init(db)
	u.jwt = internal.GetJwtService()
}

func (u *UserController) CountUsers(ctx context.Context) (int, error) {
	c, err := u.userRepository.CountUsers(ctx)
	if err != nil {
		return 0, err
	}

	return c, nil
}

func (u *UserController) SignIn(ctx context.Context, input model.SignIn) (*model.Session, error) {
	newUser := model.NewUser{
		Firstname: input.Firstname,
		Lastname:  input.Lastname,
		Email:     input.Email,
	}

	user, err := u.userRepository.CreateUser(ctx, newUser)
	if err != nil {
		return nil, err
	}

	s := model.NewSession{
		UserID:    user.ID,
		Ip:        input.Ip,
		UserAgent: input.UserAgent,
		Expired:   time.Now().Add(u.jwt.GetExpiry()),
	}

	session, err := u.userRepository.CreateSession(ctx, s)
	if err != nil {
		return nil, err
	}

	p := internal.NewPayload(user.ID.String(), u.jwt.GetExpiry())

	token, err := u.jwt.Sign(p)
	if err != nil {
		return nil, err
	}
	session.Token = token

	return session, nil
}

func (u *UserController) SetDefaultBusiness(ctx context.Context, userID, businessID uuid.UUID) (*model.User, error) {
	user, err := u.userRepository.SetDefaultBusiness(ctx, userID, businessID)
	if err != nil {
		return nil, err
	}

	return user, err
}

func (u *UserController) GetUserByID(ctx context.Context, userID uuid.UUID) (*model.User, error) {
	user, err := u.userRepository.GetUserByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	return user, nil
}
