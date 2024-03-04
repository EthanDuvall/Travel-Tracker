function getUsersTrips(fetchTrip, id) {
  return fetchTrip.filter((tripData) => {
    return tripData.userID === id;
  });
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
export {getUserId, getUsersTrips , getDestination, }