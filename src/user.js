function getUsersTrips(fetchTrip, id) {
  return fetchTrip.filter((tripData) => {
    return tripData.userID === id;
  });
}

function getTripIds(trips){
  return trips.reduce((tripIds, trip) => {
    tripIds.push(trip.destinationID)
    return tripIds
  },[])
}

function getDestination(tripId,destinations){
  return destinations.find((destination) => {
    return tripId === destination.id
  })
}

function getUserId(user) {
  let userId = user.split("r");
  return Number(userId[2]);
}

function getTripExpenses(destinations,trips){
  let destination,lodging,flight,total
  let expenses = {
    lodgingCost:0,
    flightCost:0,
    totalCost:0
  }
  trips.forEach(trip => {
   destination = getDestination(trip.destinationID,destinations)
   lodging = destination.estimatedLodgingCostPerDay * trip.duration
   flight = destination.estimatedFlightCostPerPerson * trip.travelers
   total = flight + lodging + (flight + lodging)*.1
   expenses.lodging += lodging
   expenses.flightCost += flight
   expenses.totalCost += total
  });
  return expenses
}
export {getUserId, getUsersTrips , getDestination, getTripIds, getTripExpenses}