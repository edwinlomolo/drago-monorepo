FROM golang:1.22

# Postgres
ENV POSTGRES_DATABASE_DRIVER=$POSTGRES_DATABASE_DRIVER
ENV POSTGRES_DATABASE_URI=$POSTGRES_DATABASE_URI
ENV MIGRATE_POSTGRES_TABLES=$MIGRATE_POSTGRES_TABLES
ENV POSTGRES_MIGRATION_FILE=$POSTGRES_MIGRATION_FILE
# Server
ENV ENV=$ENV
ENV PORT=$PORT
# Jwt
ENV JWTEXPIRE=$JWTEXPIRE
ENV JWTSECRET=$JWTSECRET
# Google
ENV MAPS_PLACES_API_KEY=$MAPS_PLACES_API_KEY
ENV MAPS_GEOCODE_API_KEY=$MAPS_GEOCODE_API_KEY
ENV MAPS_ROUTES_API_KEY=$MAPS_ROUTES_API_KEY
# Redis
ENV REDIS_URI=$REDIS_URI
# Ipinfo
ENV IPINFO_API_KEY=$IPINFO_API_KEY
# Paystack
ENV PAYSTACK_BASE_API=$PAYSTACK_BASE_API
ENV PAYSTACK_SECRET_KEY=$PAYSTACK_SECRET_KEY
# Pricer
ENV MINIMUM_HOURLY_WAGE=$MINIMUM_HOURLY_WAGE

RUN mkdir -p go/src/app
WORKDIR go/src/app
COPY ./drago-api/ .
RUN go mod download && go mod verify
RUN CGO_ENABLED=0 GOOS=linux go build -o drago-api

EXPOSE 8000

CMD ["./drago-api"]
