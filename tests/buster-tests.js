/* buster-tests.js - test cases for Buster.JS */

buster.spec.expose();
var assert = buster.assertions.assert;
var refute = buster.assertions.refute;
var expect = buster.assertions.expect;


var seeds = {
  'simpleArray': [
    ['k', 42]
  ],
  'simpleData': [
    {'key': 'k',  'weight': 42}
  ],
  'planets': [
    {'key': 'mercury',  'weight': 1},
    {'key': 'venus',    'weight': 1},
    {'key': 'earth',    'weight': 5},
    {'key': 'mars',     'weight': 4},
    {'key': 'jupiter',  'weight': 2},
    {'key': 'saturn',   'weight': 1},
    {'key': 'uranus',   'weight': 1},
    {'key': 'neptune',  'weight': 1}
  ],
  'planetsWithData': [
    {'key': 'mercury',  'weight': 1, 'data': {'orbit': 1}},
    {'key': 'venus',    'weight': 1, 'data': {'orbit': 2}},
    {'key': 'earth',    'weight': 5, 'data': {'orbit': 3}},
    {'key': 'mars',     'weight': 4, 'data': {'orbit': 4}},
    {'key': 'jupiter',  'weight': 2, 'data': {'orbit': 5}},
    {'key': 'saturn',   'weight': 1, 'data': {'orbit': 6}},
    {'key': 'uranus',   'weight': 1, 'data': {'orbit': 7}},
    {'key': 'neptune',  'weight': 1, 'data': {'orbit': 8}}
  ],
  'planetsArray': [
    ['mercury', 1],
    ['venus',   1],
    ['earth',   5],
    ['mars',    4],
    ['jupiter', 2],
    ['saturn',  1],
    ['uranus',  1],
    ['neptune', 1]
  ],
  'planetsArrayWithData': [
    ['mercury', 1, {'orbit': 1}],
    ['venus',   1, {'orbit': 2}],
    ['earth',   5, {'orbit': 3}],
    ['mars',    4, {'orbit': 4}],
    ['jupiter', 2, {'orbit': 5}],
    ['saturn',  1, {'orbit': 6}],
    ['uranus',  1, {'orbit': 7}],
    ['neptune', 1, {'orbit': 8}]
  ]
};

var spec = describe("Weighted Lists", function() {

  describe('Constructor', function() {

    it('should succeed with no arguments', function() {
      expect(new WeightedList()).toBeDefined();
    });

    it('should succeed with an empty array', function() {
      expect(new WeightedList([])).toBeDefined();
    });
    it('should succeed with an single element', function() {
      expect(new WeightedList(seeds.simpleArray)).toBeDefined();
      expect(new WeightedList(seeds.simpleData)).toBeDefined();
    });
    it('should succeed with various input arrays', function() {
      expect(new WeightedList(seeds.planets)).toBeDefined();
      expect(new WeightedList(seeds.planetsWithData)).toBeDefined();
      expect(new WeightedList(seeds.planetsArray)).toBeDefined();
      expect(new WeightedList(seeds.planetsArrayWithData)).toBeDefined();
    });
    it('should throw errors on bad inputs', function() {
      var badConstructor = function() { 
        return new WeightedList( {'wrong': 'field names'} );
      };
      expect(badConstructor).toThrow();
      badConstructor = function() { 
        return new WeightedList( [ [2] ] );
      };
      expect(badConstructor).toThrow();
    });

  });

  describe('Empty List', function () {
    before(function () {
      this.wl = new WeightedList();
    });

    it('should have length zero', function() {
      expect(this.wl.length).toEqual(0);
    });
    it('should give an empty list on shuffle');
    it('should throw a stack underflow error');
    it('should throw an underflow error on too much peeking');
    it('should be pushable');
  });

});
