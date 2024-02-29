import { fetchUserData,fetchTripData } from "./apiCalls";
let user = "travel50";
let userData;



window.addEventListener("load", updatePage);


function updatePage() {
  Promise.all([fetchUserData(1)]).then((fetchUser) => {
    userData = fetchUser
    console.log(userData)
    console.log("hi");
  });
}

function showAllTravels() {}