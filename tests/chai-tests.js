/* chai tests */

// Hush up about to.be.ok and so forth
/*jshint expr: true */ 

// Get this to work in the browser and at the command line
// TODO: fix this, problem is that I'm not actually using the CommonJS
// stuff with module.exports and whatnot
// What I probably need is amdefine.js, plus a rudimentary grasp of AMD
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

// Seed data - is would be nice if this were included in some other file for 
// inclusion in all tests
var planets = [
  {'key': 'mercury',  'weight': 1},
  {'key': 'venus',    'weight': 1},
  {'key': 'earth',    'weight': 5},
  {'key': 'mars',     'weight': 4},
  {'key': 'jupiter',  'weight': 2},
  {'key': 'saturn',   'weight': 1},
  {'key': 'uranus',   'weight': 1},
  {'key': 'neptune',  'weight': 1}
];

var planetsWithData = [
  {'key': 'mercury',  'weight': 1, 'data': {'orbit': 1}},
  {'key': 'venus',    'weight': 1, 'data': {'orbit': 2}},
  {'key': 'earth',    'weight': 5, 'data': {'orbit': 3}},
  {'key': 'mars',     'weight': 4, 'data': {'orbit': 4}},
  {'key': 'jupiter',  'weight': 2, 'data': {'orbit': 5}},
  {'key': 'saturn',   'weight': 1, 'data': {'orbit': 6}},
  {'key': 'uranus',   'weight': 1, 'data': {'orbit': 7}},
  {'key': 'neptune',  'weight': 1, 'data': {'orbit': 8}}
];

var planetsArray = [
  ['mercury', 1],
  ['venus',   1],
  ['earth',   5],
  ['mars',    4],
  ['jupiter', 2],
  ['saturn',  1],
  ['uranus',  1],
  ['neptune', 1]
];

var planetsArrayWithData = [
  ['mercury', 1, {'orbit': 1}],
  ['venus',   1, {'orbit': 2}],
  ['earth',   5, {'orbit': 3}],
  ['mars',    4, {'orbit': 4}],
  ['jupiter', 2, {'orbit': 5}],
  ['saturn',  1, {'orbit': 6}],
  ['uranus',  1, {'orbit': 7}],
  ['neptune', 1, {'orbit': 8}]
];


describe('WeightedList', function() {

  describe('Constructor', function() {

    it('should succeed with no arguments', function() {
      expect(new WeightedList()).to.be.ok;
    });

    it('should succeed with an empty array', function() {
      expect(new WeightedList([])).to.be.ok;
    });

    it('should succeed with an single element', function() {
      var wl = new WeightedList([ ['k', 3] ]);
      expect(wl).to.be.ok;
      wl = new WeightedList([ {'key': 'k', 'weight': 3} ]);
      expect(wl).to.be.ok;
    });

    it('should succeed with various input arrays', function() {
      expect(new WeightedList(planets)).to.be.ok;
      expect(new WeightedList(planetsWithData)).to.be.ok;
      expect(new WeightedList(planetsArray)).to.be.ok;
      expect(new WeightedList(planetsArrayWithData)).to.be.ok;
    });

    it('should throw errors on bad inputs', function() {
      var badConstructor = function() { 
        return new WeightedList( {'wrong': 'field names'} );
      };
      expect(badConstructor).to.Throw(Error);
      badConstructor = function() { 
        return new WeightedList( [ [2] ] );
      };
      expect(badConstructor).to.Throw(Error);
    });
  });

  describe('Empty List', function() {
    var wl = new WeightedList();

    it('should have length zero', function() {
      wl.should.have.length(0);
    });

    it('should give an empty list on shuffle', function() {
      wl.shuffle().should.deep.equal([]);
    });

    it('should throw a stack underflow error', function() {
      var underflow = function() {
        wl.pop();
      };
      expect(underflow).to.Throw(Error);
    });

    it('should throw an underflow error on too much peeking', function() {
      var underflow = function() {
        wl.peek(2);
      };
      expect(underflow).to.Throw(Error);
    });

    it('should be pushable', function() {
      wl.push(['k', 3]);
      wl.should.be.ok;
    });

  });

  describe('WeightedList.push()', function() {
    //var empty = new WeightedList(), planets = new WeightedList(planets);
    
    it('should accept an array', function() {
      var make = function() {
        new WeightedList().push(['a', 1]);
      };
      expect(make).to.not.Throw(Error);
    });

    it('should accept an array with data', function() {
      var make = function() {
        new WeightedList().push(['a', 1, {}]);
      };
      expect(make).to.not.Throw(Error);
    });

    it('should accept an object', function() {
      var make = function() {
        new WeightedList().push({'key': 'a', 'weight': 1});
      };
      expect(make).to.not.Throw(Error);
    });

    it('should accept an object with data', function() {
      var make = function() {
        new WeightedList().push({'key': 'a', 'weight': 1, 'data': 42});
      };
      expect(make).to.not.Throw(Error);
    });

    it('should increase the length', function() {
      var empty = new WeightedList();
      empty.push(['a', 2]);
      empty.should.have.length(1);
    });

    it('should validate its weights', function() {
      var badWeight = function() {
        var wl = new WeightedList();
        wl.push(['a', -2]);
      };
      expect(badWeight).to.Throw(Error);
    });

  });

  describe('WeightedList', function() {

    it('should retain its input', function() {
      var wl = new WeightedList();
      wl.push(['k', 1]);
      var result = wl.shuffle();
      result.should.have.length(1);
      result.should.deep.equal(['k']);
    });

    it('should retain its input with data', function() {
      var wl = new WeightedList();
      wl.push(['k', 1, {'d': 42}]);
      var result = wl.shuffle();
      result.should.have.length(1);
      var element = result[0];
      element.should.deep.equal({'key': 'k', 'data': {'d': 42}});
    });

    it('should pop out unique elements', function() {
      var wl = new WeightedList(planets);
      wl.should.have.length(8);
      var results = {};
      // Pop out the elements one at a time, make sure that each one only occurs once
      for (var i = 0; i < planets.length; i++) {
        var key = wl.pop();
        results[key] = (results[key] || 0) + 1;
      }
      results.should.deep.equal({'mercury': 1, 'venus': 1, 'earth': 1, 'mars': 1,
                                 'jupiter': 1, 'saturn':1, 'uranus': 1, 'neptune': 1});
      wl.should.have.length(0);
      wl.shuffle().should.deep.equal([]);
    });

    it('should return the right amounts of elements in peek()', function() {
      var wl = new WeightedList(planets);
      wl.should.have.length(8);
      
      var one = wl.peek();
      one.should.have.length(1);
      wl.should.have.length(8);

      var seven = wl.peek(7);
      seven.should.have.length(7);
      wl.should.have.length(8);

      var eight = wl.peek(8);
      eight.should.have.length(8);
      wl.should.have.length(8);

    });
  });


});

