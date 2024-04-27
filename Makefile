# Tidy go packages
tidy:
	cd drago-api && go mod tidy
# Generate graphql resolvers and models
graphql:
	cd drago-api && go run github.com/99designs/gqlgen generate --verbose
# Sqlc
sqlc:
	cd drago-api && sqlc generate
# Test
tests:
	cd drago-api && go test -v ./test
# Run server
server:
	cd drago-api && go run server.go
