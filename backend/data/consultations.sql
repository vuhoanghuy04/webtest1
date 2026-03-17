CREATE DATABASE IF NOT EXISTS webtest1 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE webtest1;

CREATE TABLE IF NOT EXISTS consultations (
  id CHAR(36) PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  major VARCHAR(100) NOT NULL,
  notes TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  created_by_user_id VARCHAR(50) NULL,
  created_by_email VARCHAR(255) NULL,
  created_by_full_name VARCHAR(100) NULL
);

CREATE INDEX idx_consultations_created_at ON consultations(created_at);