-- name: CreateCourier :one
INSERT INTO couriers (
  firstname, lastname, phone, verified, status, business_id
) VALUES (
  $1, $2, $3, $4, $5, $6
)
RETURNING *;

-- name: GetBusinessCouriers :many
SELECT id, firstname, lastname, phone, verified, ST_AsGeoJSON(location) AS location, status, product_id, created_at, updated_at
FROM couriers
WHERE business_id = $1;

-- name: GetCourierByPhone :one
SELECT * FROM couriers
WHERE phone = $1 LIMIT 1;

-- name: ClearTestCouriers :execrows
DELETE FROM couriers;

-- name: GetCourierByID :one
SELECT * FROM couriers
WHERE id = $1 LIMIT 1;
