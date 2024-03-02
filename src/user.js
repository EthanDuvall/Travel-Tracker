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

function getDestinations(tripIds,destinations){
  return destinations.filter((destination) => {
    return tripIds.includes(destination.id)
  })
}

function getUserId(user) {
  let userId = user.split("r");
  return Number(userId[2]);
}
export {getUserId, getUsersTrips , getDestinations, getTripIds}