CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  phone TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  onboarding BOOLEAN NOT NULL DEFAULT TRUE,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_agent TEXT,
  ip TEXT,
  expired TIMESTAMP,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS businesses(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_type TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  has_in_house_logistic BOOLEAN NOT NULL DEFAULT FALSE,
  logo TEXT NOT NULL,
  location GEOGRAPHY,
  date_created TIMESTAMP NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  descriptions TEXT NOT NULL,
  weight_class INTEGER NOT NULL DEFAULT 0,
  icon TEXT NOT NULL,
  relevance INTEGER NOT NULL DEFAULT 0,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS couriers(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  phone TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  location GEOGRAPHY,
  fcm_token TEXT,
  status TEXT NOT NULL DEFAULT 'ONBOARDING',
  ratings FLOAT NOT NULL DEFAULT 0.0,
  points INTEGER NOT NULL DEFAULT 0,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trips(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pickup_address TEXT NOT NULL,
  dropoff_address TEXT NOT NULL,
  pick_up GEOGRAPHY NOT NULL,
  drop_off GEOGRAPHY NOT NULL,
  courier_id UUID REFERENCES couriers(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'CREATED',
  cost INTEGER DEFAULT 0,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
