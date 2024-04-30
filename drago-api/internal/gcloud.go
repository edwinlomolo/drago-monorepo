package internal

import (
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"mime/multipart"

	"cloud.google.com/go/storage"
	"github.com/edwinlomolo/drago-api/config"
	"github.com/edwinlomolo/drago-api/logger"
	"google.golang.org/api/option"
)

var (
	gcs GCS
	log = logger.GetLogger()
)

type GCS interface {
	UploadBusinessLogo(context.Context, multipart.File, *multipart.FileHeader) (string, error)
}

type gcsClient struct {
	cStorage       *storage.Client
	businessBucket string
	baseObjectUri  string
}

func NewGcs() {
	credentials, err := base64.StdEncoding.DecodeString(config.Configurations.Google.GoogleApplicationDevelopmentCredentials)
	if err != nil {
		log.WithError(err).Fatalln("reading google application development credentials")
	}

	storage, err := storage.NewClient(context.Background(), option.WithCredentialsJSON(credentials))
	if err != nil {
		log.WithError(err).Fatalln("new google cloud storage service")
	}

	gcs = &gcsClient{
		cStorage:       storage,
		businessBucket: config.Configurations.Google.GoogleCloudStorageBusinessDocumentsBucket,
		baseObjectUri:  config.Configurations.Google.GoogleCloudObjectBaseUri,
	}
}

func (gC gcsClient) UploadBusinessLogo(ctx context.Context, file multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	sw := gC.cStorage.Bucket(gC.businessBucket).Object(fileHeader.Filename).NewWriter(ctx)

	if _, err := io.Copy(sw, file); err != nil {
		return "", err
	}

	if err := sw.Close(); err != nil {
		return "", err
	}

	return fmt.Sprintf("%s/%s/%s", gC.baseObjectUri, gC.businessBucket, fileHeader.Filename), nil
}

func GetGcs() GCS {
	return gcs
}
