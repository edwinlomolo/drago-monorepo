-- name: CreateBusinessProduct :one
INSERT INTO products (
  name, descriptions, weight_class, icon, business_id
) VALUES (
  $1, $2, $3, $4, $5
)
RETURNING *;

-- name: GetBusinessProducts :many
SELECT name, descriptions, weight_class, icon, created_at, updated_at
FROM products
WHERE business_id = $1;
