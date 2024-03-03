import {
  fetchUserData,
  fetchTripData,
  fetchDestinationsData,
  postTrip,
} from "./apiCalls";
import {
  getUserId,
  getUsersTrips,
  getDestination,
  getTripExpenses,
  filterTrips,
  getCheckedDesntionation,
  checkpass
} from "./user";

const pastButton = document.querySelector("#pastButton");
const pendingButton = document.querySelector("#pendingButton");
const tabs = document.querySelector("#tabSwap");
const pastTab = document.querySelector("#past");
const pendingTab = document.querySelector("#pending");
const expensesBox = document.querySelectorAll(".expenses");
const popUpForm = document.querySelector(".pop-up-form");
const addTripButton = document.querySelector(".addTrip");
const displayBoxes = document.querySelectorAll(".box");
const closeButton = document.querySelector(".closeBtn");
const formDisplayArea = document.querySelector("#formDisplay");
const dateInput = document.querySelector("#dateInput");
const desnationInput = document.getElementsByName("destination");
const travelerInput = document.querySelector("#travelersInput");
const durationInput = document.querySelector("#durationInput");
const findButton = document.querySelector(".formBtn");
const submitButton = document.querySelector(".submitBtn");
const loginButton = document.querySelector(".loginBtn")
const usernameInput = document.querySelector("username")
const passwordInput = document.querySelector("password")
const passwordFeedBack = document.querySelector(".pasFeedback")


let selectedButton = pastButton;
let selectedTab = pastTab;
let user;
let userData, userTrips, destinations, allTrips;


addTripButton.addEventListener("click", openAddTripForm);
closeButton.addEventListener("click", closeAddTripForm);

findButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  displayAviableBookings();
});

submitButton.addEventListener("click", () => {
  let selectedDestionation = getCheckedDesntionation(desnationInput);
  let desnationId = Number(selectedDestionation.id)
  let newTrip = {
    id: Date.now(),
    userId: userData.id,
    destination: desnationId,
    travelers: travelerInput.value,
    date: dateInput.value.replaceAll("-", "/"),
    duration: durationInput.value,
  };
  postTrip(newTrip)
});

window.addEventListener("load", ()=>{
  if(getStoredUser()){
    user = getStoredUser()
    unhideBoxs()
    updatePage()
  }
})


loginButton.addEventListener("click",(evt)=>{
  evt.preventDefault()
  if(checkpass(passwordInput.value)){
    storeUser(user.value)
    updatePage()
  }else{
    passwordFeedBack.classList.remove.inactive
  }

})


tabs.addEventListener("click", (evt) => {
  let tab = evt.target.closest("button");
  let selectedSection = document.querySelector(`#${tab.classList[0]}`);
  toggleTabs(selectedSection, tab);
});

function updatePage() {
  Promise.all([
    fetchUserData(getUserId(user)),
    fetchTripData(),
    fetchDestinationsData(),
  ]).then(([fetchUser, fetchTrip, fetchDestinations]) => {
    userData = fetchUser;
    allTrips = fetchTrip.trips;
    destinations = fetchDestinations.destinations;
    userTrips = getUsersTrips(fetchTrip.trips, userData.id);
    displayTrips();
    displayExpenses();
  });
}


function displayTrips() {
  let tab;
  let destination;
  userTrips.forEach((trip) => {
    if (trip.status === "approved") {
      tab = pastTab;
    } else if (trip.status === "pending") {
      tab = pendingTab;
    }
    destination = getDestination(trip.destinationID, destinations);
    tab.insertAdjacentHTML(
      "beforeend",
      `
      <div>
      <aside>
      <h4>${destination.destination}</h4>
      <p>Travelers : ${trip.travelers}</p>
      <p>Date : ${trip.date}</p>
      </aside>
      <img src =${destination.image} alt = ${destination.alt}>
      </div>
      `
    );
  });
}
function displayExpenses() {
  let expenses = getTripExpenses(destinations, userTrips);
  expensesBox.forEach((expense) => {
    let key = expense.id + "Cost";
    expense.insertAdjacentHTML("beforeend", `<p>${expenses[key]}$</p>`);
  });
}
function toggleTabs(tab, button) {
  selectedTab.classList.add("inactive");
  selectedTab.classList.remove("active");
  tab.classList.add("active");
  tab.classList.remove("inactive");
  selectedButton.classList.remove("active");
  button.classList.add("active");
  selectedTab = tab;
  selectedButton = button;
}

function openAddTripForm() {
  popUpForm.style.display = "flex";
  displayBoxes.forEach((box) => {
    box.style.filter = "blur(6px)";
  });
}

function closeAddTripForm() {
  popUpForm.style.display = "none";
  displayBoxes.forEach((box) => {
    box.style.filter = "blur(none)";
  });
}

function displayAviableBookings() {
  const tripVaules = {
    date: dateInput.value.replaceAll("-", "/"),
    traveler: travelerInput.value,
    duration: durationInput.value,
  };
  displayDestinations(tripVaules);
  submitButton.classList.remove("inactive");
}

function displayDestinations(tripVaule) {
  let total = 0;
  destinations.forEach((desntination) => {
    total = Math.round(
      (desntination.estimatedLodgingCostPerDay * tripVaule.duration +
        desntination.estimatedFlightCostPerPerson * tripVaule.traveler) *
        0.1
    );
    formDisplayArea.insertAdjacentHTML(
      "beforeend",
      `
    <div>
      <label for="destination">${desntination.destination}</label>
      <input type="radio" name="destination" id="${desntination.id}" required/>
      <aside>
        <p>Lodging Cost : ${
          desntination.estimatedLodgingCostPerDay * tripVaule.duration
        } $</p>
        <p>Flight Cost : ${
          desntination.estimatedFlightCostPerPerson * tripVaule.traveler
        }$</p>
        <p>Estimated Total : ${total} $</p>
      </aside>
      <img src = ${desntination.image} alt = ${desntination.alt}>
    </div>
    `
    );
  });
}

function unhideBoxs(){

}