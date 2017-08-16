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
          (" ").repeat( idLength - room.id.toString().length) +
          room.id +
           " | " +
          room.name +
          (" ").repeat( roomNameLength - room.name.length) +
           " | " +
          room.email +
          (" ").repeat(emailLength - room.email.length) + " | ")
      })
    })
    .then( ()=> console.log( `|--------+----------+-----------|` ) )
}

let ordersById = argument => {
  let orderLength = `order id`.length
  let costLength = `total cost`.length
  console.log(`|----------+------------|`)
  console.log(`| order id | total cost |`)
  console.log(`|----------+------------|`)
  let list = getOrdersByShopperId( argument )
    .then( items => {
      items.map( item => {
        console.log("| " +
          item.id +
          (" ").repeat( orderLength - item.id.toString().length) +
           " | " +
          (" ").repeat(costLength - item.total_cost.length) +
          item.total_cost +
          " | ")
      })
    })
    .then( ()=> console.log( `|----------+------------|` ) )
}

let realshoppers = () => {
  let shopperNameLength = `shopper name`.length
  let numOrdersLength = `number of orders`.length
  console.log(`|--------------+------------------|`)
  console.log(`| shopper name | number of orders |`)
  console.log(`|--------------+------------------|`)
  let list = getAllRealShoppers( )
    .then( items => {
      items.map( item => {
        console.log("| " +
          item.fname +
          (" ").repeat( shopperNameLength - item.fname.length) +
           " | " +
          (" ").repeat(numOrdersLength - item.count.toString().length) +
          item.count +
          " | ")
      })
    })
    .then( ()=> console.log( `|--------------+------------------|` ) )
}

let func = process.argv[2]
let argument = process.argv[3]

switch (func) {
  case "guests": guests()
   break;
  case "rooms": rooms(argument)
    break;
  case "bookings": bookings(argument)
    break;
  default:

}
