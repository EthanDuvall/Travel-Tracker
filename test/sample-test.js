import chai from "chai";
import {
  getUserId,
  getDestinations,
  getTripIds,
  getUsersTrips,
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
      },
      {
        id: 4,
      },
      {
        id: 8,
      },
      {
        id: 5,
      },
      {
        id: 9,
      },
    ];
    trips = [
      {
        destinationID: 1,
        userID: 3,
      },
      {
        destinationID: 3,
        userID: 2,
      },
      {
        destinationID: 8,
        userID: 5,
      },
      {
        destinationID: 2,
        userID: 3,
      },
      {
        destinationID: 9,
        userID: 3,
      },
    ];
    travelerId = 3;
  });

  it("Should Get User Trips", function () {
    const expected = getUsersTrips(trips, travelerId);
    expect(expected).to.be.an("array").with.lengthOf(3);
    expect(expected[0]).to.deep.equal({ destinationID: 1,userID: 3});
    expect(expected[2]).to.deep.equal({ destinationID: 9,userID: 3});
  });

  it("Should Get Trip Ids", function () {
    const expected = getTripIds(getUsersTrips(trips,travelerId))
    expect(expected).to.be.an("array").with.lengthOf(3);
    expect(expected[0]).to.deep.equal(1);
    expect(expected[2]).to.deep.equal(9);
    });

  it("Should Get The Destnations", function () {
    const expected = getDestinations(getTripIds(getUsersTrips(trips,travelerId)),destinations)
    expect(expected).to.be.an("array").with.lengthOf(2);
    expect(expected[0]).to.deep.equal({id: 1});
    expect(expected[1]).to.deep.equal({id: 9});
  });
});
