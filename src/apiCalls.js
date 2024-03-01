function fetchUserData(id, usersData) {
  return fetch(`http://localhost:3001/api/v1/travelers/${id} `)
    .then((rsp) => rsp.json())
    .then((data) => (usersData = data));
}
function fetchTripData(tripData) {
  return fetch("http://localhost:3001/api/v1/trips")
    .then((rsp) => rsp.json())
    .then((data) => (tripData = data));
}
export { fetchUserData, fetchTripData };
