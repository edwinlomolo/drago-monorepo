package dataloaders

import (
	"context"
	"time"

	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/postgres/db"
	"github.com/google/uuid"
	"github.com/vikstrous/dataloadgen"
)

// userReader reads user(s) from the database
type userReader struct {
	db *db.Queries
}

func (ur *userReader) getUsersByID(ctx context.Context, ids []string) ([]*model.User, []error) {
	userIds := make([]uuid.UUID, 0, len(ids))
	for _, v := range ids {
		uid, err := uuid.Parse(v)
		if err != nil {
			return nil, []error{err}
		}
		userIds = append(userIds, uid)
	}

	allUsers, err := ur.db.GetUsersByID(ctx, userIds)
	if err != nil {
		return nil, []error{err}
	}

	users := make([]*model.User, 0, len(ids))
	errs := make([]error, 0, len(ids))
	for _, user := range allUsers {
		user := &model.User{
			ID:        user.ID,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		}
		users = append(users, user)
	}

	return users, errs
}

type Loaders struct {
	UserLoader *dataloadgen.Loader[string, *model.User]
}

func NewLoaders(db *db.Queries) *Loaders {
	ur := userReader{db}
	return &Loaders{
		UserLoader: dataloadgen.NewLoader(ur.getUsersByID, dataloadgen.WithWait(time.Millisecond)),
	}
}
