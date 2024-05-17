package handler

import (
	"encoding/json"
	"net/http"

	"github.com/edwinlomolo/drago-api/internal"
	"github.com/edwinlomolo/drago-api/logger"
	"github.com/sirupsen/logrus"
)

func Ipinfo() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ipService := internal.GetIpService()
		log := logger.GetLogger()
		info, err := ipService.GetIpinfo(r.RemoteAddr)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		res, err := json.Marshal(info)
		if err != nil {
			log.WithFields(logrus.Fields{"ip": r.RemoteAddr}).WithError(err).Errorf("marshal ip info handler res")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	})
}
