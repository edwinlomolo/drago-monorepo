package test

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	dragoHandler "github.com/edwinlomolo/drago-api/handler"
	"github.com/edwinlomolo/drago-api/internal"
	"github.com/edwinlomolo/drago-api/middleware"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_API(t *testing.T) {
	ctx := context.Background()
	defer dB.ClearTestUsers(ctx)

	userController := userC()
	//c := client.New(handler.NewDefaultServer(graph.NewExecutableSchema(graph.New())))

	t.Run("signin_handler", func(t *testing.T) {
		payload, err := json.Marshal(newUser())
		require.Nil(t, err)

		req := httptest.NewRequest("POST", "http://example.com/foo", bytes.NewBuffer(payload))
		w := httptest.NewRecorder()
		dragoHandler.SignIn(userController)(w, req)

		res := w.Result()
		body, err := io.ReadAll(res.Body)
		require.Nil(t, err)

		assert.NotEmpty(t, string(body), "should contain signin response object")
		assert.Equal(t, res.StatusCode, http.StatusOK, "status code should be 200")
	})

	t.Run("authenticate_api_requests", func(t *testing.T) {
		token, err := internal.GetJwtService().Sign(internal.NewPayload("254", time.Duration(time.Minute)))
		require.Nil(t, err)

		req := httptest.NewRequest("POST", "http://example.com/foo", nil)
		req.Header.Add("Authorization", "Bearer "+token)
		w := httptest.NewRecorder()
		h := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			res, _ := json.Marshal(map[string]string{"success": "OK"})
			w.Write(res)
		})
		middleware.Auth(h).ServeHTTP(w, req)

		resp := w.Result()
		assert.Equal(t, resp.StatusCode, http.StatusOK, "should pass with status code 200")
	})

	t.Run("drop_invalid_api_requests", func(t *testing.T) {
		req := httptest.NewRequest("POST", "http://example.com/foo", nil)
		w := httptest.NewRecorder()
		h := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			res, _ := json.Marshal(map[string]string{"success": "OK"})
			w.Write(res)
		})
		middleware.Auth(h).ServeHTTP(w, req)

		res := w.Result()
		assert.Equal(t, res.StatusCode, http.StatusUnauthorized, "should fail with 401 status code")
	})

	t.Run("verification_token_expiry", func(t *testing.T) {
		token, err := internal.GetJwtService().Sign(internal.NewPayload("254", time.Duration(time.Second*2)))
		require.Nil(t, err)

		req := httptest.NewRequest("POST", "http://example.com/foo", nil)
		req.Header.Add("Authorization", "Bearer "+token)
		w := httptest.NewRecorder()
		h := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			res, _ := json.Marshal(map[string]string{"success": "OK"})
			w.Write(res)
		})
		time.Sleep(time.Second * 3)
		middleware.Auth(h).ServeHTTP(w, req)

		resp := w.Result()
		assert.Equal(t, resp.StatusCode, http.StatusUnauthorized, "should pass with status code 200")
	})
}
