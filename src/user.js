function getUsersTrips(fetchTrip, id) {
  return fetchTrip.filter((tripData) => {
    return tripData.userID === id;
  });
}

function getTripIds(trips) {
  return trips.reduce((tripIds, trip) => {
    tripIds.push(trip.destinationID);
    return tripIds;
  }, []);
}

function getDestination(tripId, destinations) {
  return destinations.find((destination) => {
    return tripId === destination.id;
  });
}

function getUserId(user) {
  let userId = user.split("r");
  return Number(userId[2]);
}

function getTripExpenses(destinations, trips) {
  let destination, lodging, flight, total;
  let expenses = {
    lodgingCost: 0,
    flightCost: 0,
    totalCost: 0,
  };
  trips.forEach((trip) => {
    destination = getDestination(trip.destinationID, destinations);
    lodging = destination.estimatedLodgingCostPerDay * trip.duration;
    flight = destination.estimatedFlightCostPerPerson * trip.travelers;
    total = flight + lodging + (flight + lodging) * 0.1;
    expenses.lodgingCost += lodging;
    expenses.flightCost += flight;
    expenses.totalCost += Math.round(total);
  });
  return expenses;
}

function getCheckedDesntionation(desnationInput) {
  let foundDestionation;
  desnationInput.forEach((destination) => {
    if (destination.checked) foundDestionation = destination;
  });
  return foundDestionation;
}

function storeUser(user) {
  sessionStorage.setItem("user", user);
}

function checkpass(pass) {
  return pass === "travel";
}

function getStoredUser() {
  return sessionStorage.getItem("user");
}
function logoutUser(){
  sessionStorage.clear()
  location.reload()
}

export {
  getUserId,
  getUsersTrips,
  getDestination,
  getTripIds,
  getTripExpenses,
  getCheckedDesntionation,
  storeUser,
  checkpass,
  getStoredUser,
  logoutUser
};
