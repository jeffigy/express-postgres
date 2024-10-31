--  create database
CREATE DATABASE todo_database;

-- create table
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)