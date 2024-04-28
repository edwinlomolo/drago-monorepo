-- name: CountUsers :one
SELECT COUNT(*) FROM users;

-- name: CreateUser :one
INSERT INTO users (
  firstname, lastname, email
) VALUES (
  $1, $2, $3
) RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = $1 LIMIT 1;

-- name: GetUserByID :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: CreateSession :one
INSERT INTO sessions (
  ip, user_agent, expired, user_id
) VALUES (
  $1, $2, $3, $4
) RETURNING *;

-- name: GetSession :one
SELECT * FROM sessions
WHERE user_id = $1 LIMIT 1;

-- name: DestroySession :one
UPDATE sessions
SET expired = CURRENT_TIMESTAMP
WHERE user_id = $1
RETURNING *;

-- name: FinishOnboarding :one
UPDATE sessions
SET onboarding = FALSE
WHERE id = $1 RETURNING *;

-- name: ClearTestUsers :execrows
DELETE FROM users;

-- name: GetUsersByID :many
SELECT * FROM users
WHERE id IN (sqlc.arg(ids)::uuid[]);

-- name: ClearTestSessions :execrows
DELETE FROM sessions;

-- name: UpdateUserDefaultBusiness :one
UPDATE users
SET metadata['default_business'] = sqlc.arg(business_id)
WHERE id = $1 RETURNING *;
