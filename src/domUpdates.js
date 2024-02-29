import { fetchUserData, fetchTripData } from "./apiCalls";
let user = "travel1";
let userData, userTrips;

window.addEventListener("load", updatePage);

function updatePage() {
  Promise.all([fetchUserData(getUserId()), fetchTripData()]).then(
    ([fetchUser, fetchTrip]) => {
      userData = fetchUser;
      userTrips = getUsersTrips(fetchTrip);
    }
  );
}

function getUsersTrips(fetchTrip) {
  return fetchTrip.trips.filter((tripData) => {
    return tripData.userID === userData.id;
  });
}

function getUserId() {
  let userId = user.split("l");
  return userId[1];
}
