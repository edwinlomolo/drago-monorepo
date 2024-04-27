-- name: CreateBusiness :one
INSERT INTO businesses (
  business_type, date_created, name, logo, phone, user_id, has_in_house_logistic, location
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, sqlc.arg(location)
) RETURNING *;

-- name: GetBusinessBelongingToUser :many
SELECT id, name, phone, logo, business_type, date_created, has_in_house_logistic, ST_AsGeoJSON(location) AS location, created_at, updated_at FROM businesses
WHERE user_id = $1;

-- name: ClearTestBusinesses :execrows
DELETE FROM businesses;
