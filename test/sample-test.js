import chai from "chai";
import {
  getUserId,
  getDestination,
  getTripIds,
  getUsersTrips,
  getTripExpenses,
} from "../src/user";
const expect = chai.expect;

describe("See if the tests are running", function () {
  it("should return true", function () {
    expect(true).to.equal(true);
  });
});

describe("See if able to get user info properly", function () {
  it("should return the id", function () {
    const expected = getUserId("travler50");
    expect(expected).to.equal(50);
  });
});

describe("Get users trip data", function () {
  let trips;
  let destinations;
  let travelerId;
  beforeEach(function () {
    destinations = [
      {
        id: 1,
        estimatedLodgingCostPerDay:5,
        estimatedFlightCostPerPerson:1
      },
      {
        id: 4,
        estimatedLodgingCostPerDay:9,
        estimatedFlightCostPerPerson:7

      },
      {
        id: 8,
        estimatedLodgingCostPerDay:2,
        estimatedFlightCostPerPerson:4
      },
      {
        id: 5,
        estimatedLodgingCostPerDay:2,
        estimatedFlightCostPerPerson:8
      },
      {
        id: 9,
        estimatedLodgingCostPerDay:6,
        estimatedFlightCostPerPerson:5
      },
    ];
    trips = [
      {
        destinationID: 1,
        userID: 3,
        duration:2,
        travelers:3
      },
      {
        destinationID: 4,
        userID: 2,
        duration:1,
        travelers:8
      },
      {
        destinationID: 8,
        userID: 5,
        duration:6,
        travelers:3
      },
      {
        destinationID: 5,
        userID: 3,
        duration:8,
        travelers:5
      },
      {
        destinationID: 9,
        userID: 3,
        duration:2,
        travelers:2
      },
    ];
    travelerId = 3;
  });

  it("Should Get User Trips", function () {
    const expected = getUsersTrips(trips, travelerId);
    expect(expected).to.be.an("array").with.lengthOf(3);
    expect(expected[0]).to.deep.equal({ destinationID: 1,duration:2,travelers:3,userID: 3});
    expect(expected[2]).to.deep.equal({
      destinationID: 9,
      userID: 3,
      duration:2,
      travelers:2
    });
  });

  it("Should Get Trip Ids", function () {
    const expected = getTripIds(getUsersTrips(trips,travelerId))
    expect(expected).to.be.an("array").with.lengthOf(3);
    expect(expected[0]).to.deep.equal(1);
    expect(expected[2]).to.deep.equal(9);
    });

  it("Should Get The Destnation", function () {
    const expected = getDestination(9,destinations)
    expect(expected).to.deep.equal( {
      id: 9,
      estimatedLodgingCostPerDay:6,
      estimatedFlightCostPerPerson:5
    })
   
  });
  it("Should get all trip expenses", function(){
    const expected = getTripExpenses(destinations,trips)
    expect(expected).to.be.an("object")
    expect(expected.flightCost).to.deep.equal(121)
    expect(expected.lodgingCost).to.deep.equal(59)
    expect(expected.totalCost).to.deep.equal(198)

  })
});
