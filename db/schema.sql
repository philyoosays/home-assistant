DROP DATABASE template;
CREATE DATABASE template;

\c template

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fname TEXT,
  lname TEXT,
  username TEXT,
  email TEXT,
  pass_digest TEXT,
  active BOOLEAN DEFAULT true,
  created TIMESTAMP DEFAULT NOW()
)
