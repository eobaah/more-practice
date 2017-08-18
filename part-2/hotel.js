const {
  listAllGuests,
  checkCurrentRooms,
  checkCurrentAvailability,
  checkUpcomingBookings,
  checkBookingsByRoom
} = require('./database.js');

let guests = argument => {
  let idLength = `ID`.length
  let guestNameLength = `Marchelle Bloodworthe  `.length
  let emailLength = `mbloodwortheb@seattletimes.com       `.length
  console.log(`|----+-------------------------+---------------------------------------|`)
  console.log(`| ID | Guest Name              | EMAIL                                 |`)
  console.log(`|----+-------------------------+---------------------------------------|`)
  let list = listAllGuests()
    .then( guests => {
      guests.map( guest => {
        console.log("| " +
          (" ").repeat( idLength - guest.id.toString().length) +
          guest.id +
           " | " +
          guest.name +
          (" ").repeat( guestNameLength - guest.name.length) +
           " | " +
          guest.email +
          (" ").repeat(emailLength - guest.email.length) + " | ")
      })
    })
    .then( ()=> console.log( `|----+-------------------------+---------------------------------------|` ) )
}

let rooms = argument => {
  if ( argument === '--available') {
    argument = "TRUE"
  }
  let roomLength = `Room #`.length
  let capacityLength = `Capacity`.length
  let availableLength = `Available`.length
  console.log(`|--------+----------+-----------|`)
  console.log(`| Room # | Capacity | Available |`)
  console.log(`|--------+----------+-----------|`)
  let list = checkCurrentAvailability(argument)
    .then( rooms => {
      rooms.map( room => {
        console.log("| " +
          room.number +
          (" ").repeat( roomLength - room.number.toString().length) +
           " | " +
          room.capacity +
          (" ").repeat( capacityLength - room.capacity.toString().length) +
           " | " +
          room.availability +
          (" ").repeat(availableLength - room.availability.toString().length) + " | ")
      })
    })
    .then( ()=> console.log( `|--------+----------+-----------|` ) )
}

let bookingsByRoom = argument => {
  let roomLength = `Room #`.length
  let guestNameLength = ` Guest Name            `.length
  let dateLength = `Check-In  `.length
  console.log(`|--------+-------------------------+------------+------------|`)
  console.log(`| Room # | Guest Name              | Check-In   | Check Out  |`)
  console.log(`|--------+-------------------------+------------+------------|`)
  let list = checkBookingsByRoom(argument)
    .then( rooms => {
      rooms.map( room => {
        console.log("| " +
          room["Room #"] +
          (" ").repeat( roomLength - room["Room #"].length) +
           " | " +
          room["Guest Name"] +
          (" ").repeat( guestNameLength - room["Guest Name"].length) +
           " | " +
          room["Check-In"] +
          (" ").repeat(dateLength - room["Check-In"].length) +
           " | " +
          room["Check Out"] +
          (" ").repeat(dateLength - room["Check Out"].length) +
          " | ")
      })
    })
    .then( ()=> console.log( `|--------+-------------------------+------------+------------|` ) )
}

let bookings = () => {
  let roomLength = `Room #`.length
  let guestNameLength = ` Guest Name            `.length
  let dateLength = `Check-In  `.length
  console.log(`|--------+-------------------------+------------+------------|`)
  console.log(`| Room # | Guest Name              | Check-In   | Check Out  |`)
  console.log(`|--------+-------------------------+------------+------------|`)
  let list = checkUpcomingBookings()
    .then( rooms => {
      rooms.map( room => {
        console.log("| " +
          room["Room #"] +
          (" ").repeat( roomLength - room["Room #"].length) +
           " | " +
          room["Guest Name"] +
          (" ").repeat( guestNameLength - room["Guest Name"].length) +
           " | " +
          room["Check-In"] +
          (" ").repeat(dateLength - room["Check-In"].length) +
           " | " +
          room["Check Out"] +
          (" ").repeat(dateLength - room["Check Out"].length) +
          " | ")
      })
    })
    .then( ()=> console.log( `|--------+-------------------------+------------+------------|` ) )
}

let func = process.argv[2]
let argument = process.argv[3]
console.log( typeof argument )
switch (func) {
  case "guests": guests()
   break;
  case "rooms": rooms(argument)
    break;
  case "bookings": argument == undefined ? bookings(): bookingsByRoom(argument)
    break;
  default:

}
