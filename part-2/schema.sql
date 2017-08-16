DROP DATABASE IF EXISTS hotel_db;
CREATE DATABASE hotel_db;

\c hotel_db

CREATE TABLE IF NOT EXISTS rooms(
  id SERIAL PRIMARY KEY,
  number VARCHAR(2),
  capacity INTEGER);

CREATE TABLE IF NOT EXISTS guests(
  id SERIAL PRIMARY KEY,
  name VARCHAR(140),
  email VARCHAR(140));


CREATE TABLE IF NOT EXISTS bookings(
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(id),
  guest_id INTEGER REFERENCES guests(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL);

DROP VIEW availability
CREATE VIEW availability AS
  SELECT rooms.number, rooms.capacity,
  CASE WHEN bookings.check_in < CURRENT_DATE AND CURRENT_DATE < bookings.check_out
  THEN FALSE
  ELSE TRUE
  END AS Availability
  FROM bookings
  JOIN rooms
  ON rooms.id = bookings.room_id
