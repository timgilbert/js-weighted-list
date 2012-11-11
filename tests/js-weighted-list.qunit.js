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

(function() {
  module('WeightedList constructors');

  test('Proper constructors', function() {
    ok( new WeightedList(), 'No-argument constructor');
    ok( new WeightedList([]), 'Empty array');
    ok( new WeightedList(noDataPair), 'Single-entry constructor');
    ok( new WeightedList(simpleDataPair), 'Single-entry constructor with data');
    ok( new WeightedList(single), 'Single-element array');
    ok( new WeightedList(planets), 'Multiple-element array');
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

