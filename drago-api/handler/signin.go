package handler

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/edwinlomolo/drago-api/config"
	"github.com/edwinlomolo/drago-api/controllers"
	"github.com/edwinlomolo/drago-api/graph/model"
	"github.com/edwinlomolo/drago-api/internal"
	"github.com/edwinlomolo/drago-api/logger"
)

var log = logger.GetLogger()

func SignIn(userController controllers.UserController) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		req := model.NewUser{}

		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			log.WithError(err).Error("handler: reading request body")
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		req.Ip = r.RemoteAddr
		req.UserAgent = r.UserAgent()

		session, err := userController.SignIn(r.Context(), model.SignIn{NewUser: req})
		if err != nil {
			log.WithError(err).Error("handler: signin controller")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// testing env?
		if config.Configurations != nil {
			ipinfo, err := internal.GetIpService().GetIpinfo(r.RemoteAddr)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			coords := strings.Split(ipinfo.Location, ",")
			lat, err := strconv.ParseFloat(coords[0], 64)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			lng, err := strconv.ParseFloat(coords[1], 64)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			session.Location = model.Gps{Lat: lat, Lng: lng}
		}

		res, err := json.Marshal(session)
		if err != nil {
			log.WithError(err).Error("handler: marshal signin response")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	})
}
