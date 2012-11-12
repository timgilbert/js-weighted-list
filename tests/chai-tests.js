/* chai tests */

// Get this to work in the browser and at the command line
// TODO: fix this, problem is that I'm not actually using the CommonJS
// stuff with module.exports and whatnot
if (typeof require !== 'undefined') {
  chai = require('chai');
  WeightedList = require('../js-weighted-list');
  console.log(WeightedList);
  //.WeightedList;
}
// else chai has been defined for us via a <script src="chai.js"/>


//chai.Assertion.includeStack = true;
var should = chai.should();
var expect = chai.expect;

describe('WeightedList', function() {

  describe('Constructor', function() {
    it('should succeed with no arguments', function() {
        var wl = new WeightedList();
        console.debug(wl);
        expect(wl).to.be.ok;
    });
    it('should succeed with an empty array', function() {
        expect(new WeightedList([])).to.be.ok;
    });
  });

});
