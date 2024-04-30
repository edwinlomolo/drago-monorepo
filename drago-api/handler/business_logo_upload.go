package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/edwinlomolo/drago-api/internal"
)

func BusinessLogoUpload() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		uploader := internal.GetGcs()
		maxSize := int64(6000000)

		err := r.ParseMultipartForm(maxSize)
		if err != nil {
			http.Error(w, errors.New("FileTooLargeErr").Error(), http.StatusBadRequest)
		}

		file, fileHeader, err := r.FormFile("file")
		if err != nil {
			http.Error(w, errors.New("NoFileUploadErr").Error(), http.StatusBadRequest)
		}
		defer file.Close()

		url, err := uploader.UploadBusinessLogo(r.Context(), file, fileHeader)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		res, err := json.Marshal(struct {
			ImageUrl string `json:"imageUrl"`
		}{ImageUrl: url})
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	})
}
