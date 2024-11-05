CREATE DATABASE todo_app;

CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_complete BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);