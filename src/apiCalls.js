import { displayError } from "./domUpdates";

function fetchUserData(id, usersData) {
  return fetch(`http://localhost:3001/api/v1/travelers/${id} `)
    .then((rsp) => rsp.json())
    .then((data) => (usersData = data))
    .catch((error) => {
      displayError();
      console.log(error);
    });
}
function fetchTripData(tripData) {
  return fetch("http://localhost:3001/api/v1/trips")
    .then((rsp) => rsp.json())
    .then((data) => (tripData = data))
    .catch((error) => {
      displayError();
      console.log(error);
    });
}
function fetchDestinationsData(destinations) {
  return fetch("http://localhost:3001/api/v1/destinations	")
    .then((rsp) => rsp.json())
    .then((data) => (destinations = data))
    .catch((error) => {
      displayError();
      console.log(error);
    });
}
function postTrip(trip) {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify({
      id: trip.id,
      userID: trip.userId,
      destinationID: trip.destination,
      travelers: trip.travelers,
      date: trip.date,
      duration: trip.duration,
      status: "pending",
      suggestedActivities: [],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    displayError();
    console.log(error);
  });
}
export { fetchUserData, fetchTripData, fetchDestinationsData, postTrip };
