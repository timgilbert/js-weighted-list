/**
 * js-weighted-list.js
 * 
 * version 0.1
 * 
 * This file is licensed under the MIT License, please see MIT-LICENSE.txt for details.
 * 
 * https://github.com/timgilbert/js-weighted-list is its home.
 */
function WeightedList(initial) { 
  this.weights = {};
  this.data = {};
  this.length = 0;
  this.hasData = false;
  //console.debug(initial);
  if (initial != null) {
    for (var i = 0; i < initial.length; i++) {
      var item = initial[i]
      this.addItem(item[0], item[1], item[2]);
    }
  }
}
WeightedList.prototype = {
  /**
   * Add an item to the list
   */
  addItem: function(key, weight, data) {
    //console.debug('k:', key, 'w:', weight, 'd:', data);
    this.weights[key] = weight;
    if (data != null) {
      this.hasData = true;
      this.data[key] = data;
    }
    this.length++;
  },
  
  /** 
   * Add the given weight to the list item with the given key
   */
  addWeight: function(key, weight) {
    this.weights[key] += weight;
  },
  
  /**
   * Select n random elements (without replacement), default 1.
   * If andRemove is true (default false), remove the elements
   * from the list.  (This is what the pop() method does.)
   */
  peek: function(n, andRemove) {
    if (n == null) {
      n = 1;
    }
    andRemove = !!andRemove;
    
    heap = this._buildWeightedHeap();
    //console.debug('heap:', heap);
    result = [];
    
    for (var i = 0; i < n; i++) {
      key = heap.pop();
      //console.debug('k:', key);
      if (this.hasData) {
        result.push({key: key, value: this.data[key]});
      } else {
        result.push(key);
      }
      if (andRemove) {
        delete this.weights[key];
        delete this.values[key];
        this.length--;
      }
    }
    return result;
  },
  
  /**
   * Return the entire list in a random order (note that this does not mutate the list)
   */
  shuffle: function() {
    return this.peek(this.length);
  },
  
  /**
   * 
   */
  pop: function(n) {
    return peek(n, true);
  },
  
  /**
   * Build a WeightedHeap instance based on the data we've got
   */
  _buildWeightedHeap: function() {
    var items = [];
    for (var key in this.weights) {
      // skip over Object.prototype monkey-patching per
      // http://bonsaiden.github.com/JavaScript-Garden/#object.forinloop
      if (this.weights.hasOwnProperty(key)) {
        items.push([key, this.weights[key]]);
      }
    }
    //console.log('items',items);
    return new _WeightedHeap(items);
  }
}

/**
 * This is a javascript implementation of the algorithm described by 
 * Jason Orendorff here: http://stackoverflow.com/a/2149533/87990
 */
function _HeapNode(weight, value, total) {
  this.weight = weight;
  this.value = value;
  this.total = total;  // Total weight of this node and its children
}
/**
 * Note, we're using a heap structure here for its tree properties, not as a 
 * classic binary heap. A node heap[i] has children at heap[i<<1] and at 
 * heap[(i<<1)+1]. Its parent is at h[i>>1]. Heap[0] is vacant.
 */
function _WeightedHeap(items) {
  this.heap = [null];   // Math is easier to read if we index array from 1
  
  // First put everything on the heap 
  for (var i = 0; i < items.length; i++) {
    var weight = items[i][1];
    var value = items[i][0];
    this.heap.push(new _HeapNode(weight, value, weight));
  }
  // Now go through the heap and each node's weight to its parent
  for (i = this.heap.length - 1; i > 1; i--) {
    this.heap[i>>1].total += this.heap[i].total;
  }
  //console.debug('_Wh heap', this.heap);
}

_WeightedHeap.prototype = {
  pop: function() {
    // Start with a random amount of gas
    var gas = this.heap[1].total * Math.random();
    
    // Start driving at the root node
    var i = 1;  
    
    // While we have enough gas to keep going past i:
    while (gas > this.heap[i].weight) {
      gas -= this.heap[i].weight;     // Drive past i
      i <<= 1;                        // Move to first child
      if (gas > this.heap[i].total) {
        gas -= this.heap[i].total     // Drive past first child and its descendants
        i++;                          // Move on to second child
      }
    }
    // Out of gas - i is our selected node.
    var value = this.heap[i].value;
    var selectedWeight = this.heap[i].weight;
    
    this.heap[i].weight = 0;          // Make sure i isn't chosen again
    while (i > 0) {
      // Remove the weight from its parent's total
      this.heap[i].total -= selectedWeight
      i >>= 1;  // Move to the next parent
    }
    return value;
  }
};

//  NB: another binary heap implementation is at
// http://eloquentjavascript.net/appendix2.html
