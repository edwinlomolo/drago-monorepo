package test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_UserController(t *testing.T) {
	ctx := context.Background()
	defer dB.ClearTestUsers(ctx)
	defer dB.ClearTestSessions(ctx)

	userController := userC()

	t.Run("count_users", func(t *testing.T) {
		c, err := userController.CountUsers(ctx)

		require.Nil(t, err)
		assert.Equal(t, c, 0, "should be 0")
	})

	t.Run("signin_new_user", func(t *testing.T) {
		session, err := userController.SignIn(ctx, newUser())

		require.Nil(t, err)
		require.NotNil(t, session)
		assert.NotEmpty(t, session.Token, "should have session token")
	})

	t.Run("signin_existing_user", func(t *testing.T) {
		_, err := userController.SignIn(ctx, newUser())
		c, _ := userController.CountUsers(ctx)

		require.Nil(t, err)
		assert.Equal(t, c, 1, "user count should be 1")
	})
}
