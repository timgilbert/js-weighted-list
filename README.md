js-weighted-list
================

This is a smallish library which implements a weighted list, from which elements 
can be picked out at random with a probability dependent on their weight.  The 
list implements [random sampling without replacement][sampling].

As an example:

```javascript
    var data = [['a', 10],  
                ['b',  1],
                ['c',  1],
                ['d',  5],
                ['e',  3]];
    
    var wl = new WeightedList(data);
    
    // wl.peek() returns items at random from the list, and does not modify the list.
    var result = wl.peek();   // Ex: ['a']
    var result = wl.peek();   // Ex: ['e']
    var result = wl.peek(3);  // Ex: ['a', 'c', 'd'] 
    var result = wl.peek(3);  // Ex: ['e', 'a', 'd'] 
    var result = wl.peek(3);  // Ex: ['a', 'b', 'e'] 
    
    // wl.pop() returns random items from the list and removes the items it found
    var result = wl.pop(2);  // Ex: ['a', 'd'], after which wl consists of [ ['b',  1], ['c',  1], ['e',  3] ]
    
    // wl.push() adds new data into the set
    // note that despite the terms push and pop, the weighted list has no natural order
    wl.push('f', 6);     // wl is now [ ['b',  1], ['c',  1], ['e',  3], ['f',  6] ]
    
    // wl.addWeight() will increase the weight of a list item (or decrease it if the user passes a negative number)
    wl.addWeight('b', 4);   // wl is now [ ['b',  5], ['c',  1], ['e',  3], ['f',  6] ]
    
    // wl.shuffle() will return the entire list in random order.
    wl.shuffle();           // Ex: ['b', 'f', 'c', 'e']
    wl.shuffle();           // Ex: ['f', 'e', 'b', 'c']
    wl.shuffle();           // Ex: ['f', 'b', 'e', 'c']
```

This project initially grew from a javascript reimplementation of this 
[Stack Overflow answer by Jason Orendorff][answer], and it still uses basically the same algorithm.

js-weighted-list has no external dependencies and is licensed under the MIT License.

Usage
=====

Include the file:

```html
    <script type="text/javascript" src="js-weighted-list.js"></script>
```

(Eventually, the node.js equivalent should be `require('js-weighted-list')`, but I 
haven't verified that the package structure is correct for npm yet.)

The basic object which is exported is a WeightedList, which you can instantiate like this:

```javascript
    // Initially empty list
    var wl = new WeightedList();

    // Array of arrays
    var wl = new WeightedList([ ['a': 1], ['b': 3], ['c': 1] ]);

    // Array of objects
    var wl = new WeightedList([ {'key': 'a', 'weight': 1}, 
                                {'key': 'b', 'weight': 3}, 
                                {'key': 'c', 'weight': 1} ]);
```

Every item on the list has a key, a weight, and optionally, some other data 
attached (see below).  Keys must be unique and must be usable as keys in an 
object (eg, strings or integers).

Attaching Data
--------------

In addition to just returning key values in a random order, a WeightedList 
instance can associate arbitrary data with particular keys, which is then 
returned along with the keys.

Additional data can be passed in as a third element in the constructor list, 
or as a third argument to the addItem() method:

```javascript
    var sandwich = new WeightedList(
        [ ['marv', 10, { name: 'Marvin', sandwich: 'roast beef' } ],
          ['bob',   1, { name: 'Bob', sandwich: 'turkey' } ] ]);
   
   // Equivalent to above
   var sandwich = new WeightedList();
   sandwich.push('marv', 10, { name: 'Marvin', sandwich: 'roast beef' });
   sandwich.push('bob',   1, { name: 'Bob', sandwich: 'turkey' });
```

If a list contains data elements as described above, methods which retrieve 
elements from it will return objects of the form `{'key': k, 'data': d}` 
instead of simply `key`.  For example:

```javascript
    sandwich.peek();     // Ex: [ {'key': 'marv', 'data': {'name': 'Marvin', 'sandwich': 'roast beef'}} ]
    sandwich.shuffle();  // Ex: [ {'key': 'marv', 'data': {'name': 'Marvin', 'sandwich': 'roast beef'}}, 
                         //       {'key': 'bob',  'data': {'name': 'Bob',    'sandwich': 'turkey' }} ]
```

You can also pass in an `{'key': 'k', 'weight': 12, ` instead of an array if you'd prefer to:

```javascript
    var planets = new WeightedList(
        [ {'key': 'earth', 'weight: 10, 'data': {'orbit': 3}},
          {'key': 'mars',  'weight:  7, 'data': {'orbit': 4}} ]);

    planets.push({'key': 'pluto', 'weight: 1, 'data': {'orbit': 9}});

    sandwich.peek();     // Ex: [ {'key': 'earth', 'data': { 'orbit': 3}} ]
```

As with using arrays as parameters, the `'data'` key is optional, and if no key 
in the list has data attached to it, return values from operations that retrieve 
values from the list will return simple lists of keys instead of `{'key': k, 'data': d}`
pairs.

TODO
----

* better error handling (stack underflow, etc)

* expand qunit unit tests and look into mocha

* node.jsify

* Minified version?

* 'use strict'; 

* browser tests which graph lists, stats

* Not entirely sure if the whole "data" thing is really neccesary

[answer]: http://stackoverflow.com/a/2149533/87990
[sampling]: http://www.ma.utexas.edu/users/parker/sampling/repl.htm
