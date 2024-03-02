function getUsersTrips(fetchTrip, id) {
  return fetchTrip.trips.filter((tripData) => {
    return tripData.userID === id;
  });
}
function getUserId(user) {
  let userId = user.split("r");
  return Number(userId[2]);
}
export {getUserId, getUsersTrips}