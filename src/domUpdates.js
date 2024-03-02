import { fetchUserData, fetchTripData } from "./apiCalls";
import { getUserId, getUsersTrips } from "./user";

const currentButton = document.querySelector("#currentButton")

let user = "travel1";
let userData, userTrips;
/*
<aside>
<h4>${trip.name}</h4>
<img src =${trip.img} alt = ${trip.alt}>
</aside>
*/
window.addEventListener("load", updatePage);

function updatePage() {
  Promise.all([fetchUserData(getUserId(user)), fetchTripData()]).then(
    ([fetchUser, fetchTrip]) => {
      userData = fetchUser;
      userTrips = getUsersTrips(fetchTrip,userData.id);
    }
  );
}



