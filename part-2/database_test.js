const chai = require( 'chai' )
const assert = chai.assert
const {
  listAllGuests,
  checkCurrentRooms,
  checkCurrentAvailability,
  checkUpcomingBookings,
  checkBookingsByRoom
} = require( './database.js' )

describe( 'listAllGuests()', ()=> {
  it( 'test the database function for the command `guests`', ()=> {
    return listAllGuests()
    .then( guests => {
      assert(guests[0]["name"], 'Aurthur Velti')
      assert(guests[1]["name"], 'Kurtis Pougher')
      assert(guests[1]["email"], 'cmillson3@tinyurl.com')
      assert(guests[4]["email"], 'oreinhard4@twitter.com')
    })
  })
})

describe( 'checkCurrentAvailability(availability)', ()=> {
  it( 'test the database function for the command `rooms`', ()=> {
    return checkCurrentAvailability("TRUE")
    .then( rooms => {
      console.log(rooms)
      assert(rooms[0]["number"], '2A')
      assert(rooms[1]["number"], '2A')
      assert(rooms[1]["capacity"], 2)
      assert(rooms[4]["capacity"], 3)
    })
  })
})

describe( 'checkBookingsByRoom( number )', ()=> {
  it( 'test the database function for the command `bookings`', ()=> {
    return checkBookingsByRoom( '4c' )
    .then( rooms => {
      assert(rooms[0]["Room #"], '4C')
      assert(rooms[0]["Guest Name"], 'Janie Powers')
    })
  })
})
