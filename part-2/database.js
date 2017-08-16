const pgp = require('pg-promise')();
const CONNECTION_STRING = `pg://${process.env.USER}@localhost:5432/hotel_db`
const db = pgp( CONNECTION_STRING )

const listAllGuests = ()=> {
  return db.any(`
    SELECT * FROM guests
  `)
}

const checkCurrentRooms = () => {
  return db.manyOrNone(`
    SELECT * FROM availability
    ORDER BY number
  `)
}

const checkCurrentAvailability = (isAvailable) => {
  return db.manyOrNone(`
    SELECT * FROM availability
    WHERE availability = ${isAvailable}
    ORDER BY number
  `)
}

const checkUpcomingBookings = () => {
  return db.manyOrNone(`
    SELECT rooms.number AS "Room #", guests.name AS "Guest Name", bookings.check_in AS "Check-In", bookings.check_out AS "Check_Out" FROM bookings
    JOIN guests
    ON guests.id = bookings.guest_id
    JOIN rooms
    ON rooms.id = bookings.room_id
    WHERE bookings.check_out <= CURRENT_DATE
  `)
}

const checkBookingsByRoom = (name) => {
  return db.any(`
    SELECT rooms.number AS "Room #", guests.name AS "Guest Name", bookings.check_in AS "Check-In", bookings.check_out AS "Check_Out" FROM bookings
    JOIN guests
    ON guests.id = bookings.guest_id
    JOIN rooms
    ON rooms.id = bookings.room_id
    WHERE bookings.check_out <= CURRENT_DATE AND LOWER(rooms.number) = '${name.toLowerCase()}'
  `)
}

module.exports = {
  listAllGuests,
  checkCurrentRooms,
  checkCurrentAvailability,
  checkUpcomingBookings,
  checkBookingsByRoom
}

// listAllGuests().then( stuff => console.log( { stuff }) )
// checkCurrentRooms().then( stuff => console.log( { stuff }) )
// checkCurrentAvailability("TRUE").then( stuff => console.log( { stuff }) )
// checkUpcomingBookings().then( stuff => console.log( { stuff }) )
// checkBookingsByRoom("4C").then( stuff => console.log( { stuff }) )
