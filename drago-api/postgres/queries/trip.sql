-- name: CreateTrip :one
INSERT INTO trips (
  courier_id, business_id, pickup_address, dropoff_address, pick_up, drop_off
) VALUES (
  $1, $2, $3, $4, sqlc.arg(pickup), sqlc.arg(dropoff)
)
RETURNING *;

-- name: ClearTestTrips :execrows
DELETE FROM trips;

-- name: GetTripsBelongingToBusiness :many
SELECT id, pickup_address, dropoff_address, ST_Distance(pick_up, drop_off, true) AS distance, ST_AsGeoJSON(pick_up) AS pickup, ST_AsGeoJSON(drop_off) AS dropoff, courier_id, status, created_at, updated_at FROM trips
WHERE business_id = $1;
