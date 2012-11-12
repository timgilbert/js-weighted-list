/* qunit tests */

// Some sample seed data
var noDataPair = {'key': 'x', 'weight': 3};
var simpleDataPair = {'key': 'a', 'weight': 2, 'data': 'apples'};
var complexDataPair = {'key': 'j', 'weight': 2, 'data': {'name': 'Jupiter', 'orbit': 6}};

var single = [ {'key': 'single', 'weight': 1} ];

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

(function() {
  module('WeightedList constructors');

  test('Proper constructors', function() {
    ok( new WeightedList(), 'No-argument constructor');
    ok( new WeightedList([]), 'Empty array');
    ok( new WeightedList([noDataPair]), 'Single-entry constructor');
    ok( new WeightedList([simpleDataPair]), 'Single-entry constructor with data');
    ok( new WeightedList(planets), 'Multiple-element array, with objects');
    ok( new WeightedList(planetsWithData), 'Multiple-element array, with objects and data');
    ok( new WeightedList(planetsArray), 'Multiple-element array, with arrays');
    ok( new WeightedList(planetsArrayWithData), 'Multiple-element array, with arrays and data');
  });

  test('Improper constructors', function() {
    raises(function() {
      new WeightedList({'mispelled key': 'k', 'weight': 2});
    }, 'Badly-formed object');
    raises(function() {
      new WeightedList(42);
    }, 'Improper constructor argument');
  });

})();

(function() {
  var wl;
  module('Empty WeightedList', {
    'setup': function() {
      wl = new WeightedList();
    }
  });

  test('Basic operations', function() {
    equal( wl.length, 0, 'Zero length');
    deepEqual(wl.shuffle(), [], 'Empty list');
  });

  test('Error conditions', function() {
    raises(function() {
      wl.pop();
    }, 'Stack underflow');
    raises(function() {
      wl.peek(2);
    }, 'Peeking too much');
  });

  test('Adding elements by array', function() {
    wl.push(['k', 3]);
    deepEqual(wl.length, 1);
    deepEqual(wl.shuffle(), ['k'], 'Shuffle');
  });

  test('Adding elements by object', function() {
    wl.push({'key': 'x', 'weight': 2});
    deepEqual(wl.length, 1);
    deepEqual(wl.shuffle(), ['x'], 'Shuffle');
  });

})();

(function() {
  var wl;
  module('Pushing and popping', {
    'setup': function() {
      wl = new WeightedList(planets);
    }
  });

  test('Shuffle', function() {
    var s = wl.shuffle();
    equal(s.length, planets.length, 'Shuffled list should be the same size');
  });

  test('Pop', function() {
    var front = wl.pop();
    deepEqual(wl.length, planets.length - 1, 'pop() decrements length');
  });

})();

