function getUsersTrips(fetchTrip, id) {
  return fetchTrip.trips.filter((tripData) => {
    return tripData.userID === id;
  });
}
function getUserId(user) {
  let userId = user.split("l");
  return userId[1];
}
export {getUserId, getUsersTrips}