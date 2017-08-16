\copy rooms(id, number, capacity) FROM './rooms.csv' DELIMITER ',' CSV HEADER;

\copy guests(id, name, email) FROM './guests.csv' DELIMITER ',' CSV HEADER;

\copy bookings(id, room_id, guest_id, check_in, check_out) FROM './bookings.csv' DELIMITER ',' CSV HEADER;

CREATE VIEW availability AS
SELECT rooms.number, rooms.capacity, bookings.check_in, bookings.check_out,
CASE WHEN bookings.check_in < CURRENT_DATE AND CURRENT_DATE < bookings.check_out
THEN FALSE
ELSE TRUE
END AS Availability
FROM bookings
JOIN rooms
ON rooms.id = bookings.room_id
