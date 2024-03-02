import { fetchUserData, fetchTripData } from "./apiCalls";
import { getUserId, getUsersTrips } from "./user";

const pastButton = document.querySelector("#pastButton")
const pendingButton = document.querySelector("#pendingButton")
const tabs = document.querySelector("#tabSwap")
const pastTab = document.querySelector("#past")

let selectedButton = pastButton
let selectedTab = pastTab
let user = "traveler1";
let userData, userTrips;
/*
<aside>
<div>
<h4>${trip.name}</h4>
<p></p>
<p></p>
</div>
<img src =${trip.img} alt = ${trip.alt}>
</aside>
*/
window.addEventListener("load", updatePage);

tabs.addEventListener("click",evt => {
  let tab = evt.target.closest("button")
  let selectedSection = document.querySelector(`#${tab.classList[0]}`)
  toggleTabs(selectedSection,tab)
  displayTrips(selectedSection)
})


function updatePage() {
  Promise.all([fetchUserData(getUserId(user)), fetchTripData()]).then(
    ([fetchUser, fetchTrip]) => {
      userData = fetchUser;
      userTrips = getUsersTrips(fetchTrip.trips,userData.id);
    }
  );
}

function displayTrips(tab){
  let section = document.querySelector(`#${tab.id}Trips`)
  console.log(section)
}

function toggleTabs(tab,button){
  selectedTab.classList.add("inactive")  
  selectedTab.classList.remove("active")
  tab.classList.add("active")
  tab.classList.remove("inactive")
  selectedButton.classList.remove("active")
  button.classList.add("active")
  selectedTab = tab
  selectedButton = button
}

