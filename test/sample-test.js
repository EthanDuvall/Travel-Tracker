import chai from 'chai';
import { getUserId } from '../src/user';
const expect = chai.expect;

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe('See if able to get user info properly', function(){
  it('should return the id', function (){
    const expected = getUserId("travler50")
    expect(expected).to.equal(50)
  })
})
