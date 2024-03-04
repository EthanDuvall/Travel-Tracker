import { fetchUserData, fetchTripData,fetchDestinationsData } from "./apiCalls";
import { getUserId, getUsersTrips, getDestination} from "./user";

const pastButton = document.querySelector("#pastButton")
const pendingButton = document.querySelector("#pendingButton")
const tabs = document.querySelector("#tabSwap")
const pastTab = document.querySelector("#past")
const pendingTab= document.querySelector("#pending")
let selectedButton = pastButton
let selectedTab = pastTab
let user = "traveler7";
let userData, userTrips,destinations;

window.addEventListener("load", updatePage);

tabs.addEventListener("click",evt => {
  let tab = evt.target.closest("button")
  let selectedSection = document.querySelector(`#${tab.classList[0]}`)
  toggleTabs(selectedSection,tab)
})


function updatePage() {
  Promise.all([fetchUserData(getUserId(user)), fetchTripData(),fetchDestinationsData()]).then(
    ([fetchUser, fetchTrip, fetchDestinations]) => {
      userData = fetchUser;
      console.log(fetchDestinations)
      destinations = fetchDestinations.destinations
      userTrips = getUsersTrips(fetchTrip.trips,userData.id);
      displayTrips()
    }
  );
}

function displayTrips(){
  let tab
  let destination
  userTrips.forEach(trip => {
    if(trip.status ==="approved"){
      tab = pastTab
    }else if (trip.status === "pending"){
      tab = pendingTab
    }
    destination = getDestination(trip.destinationID,destinations)
    tab.insertAdjacentHTML("beforeend",
      `
      <div>
      <aside>
      <h4>${destination.destination}</h4>
      <p>Travelers : ${trip.travelers}</p>
      <p>Date : ${trip.date}</p>
      </aside>
      <img src =${destination.image} alt = ${destination.alt}>
      </div>
      `)
  });
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

