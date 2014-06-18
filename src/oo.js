/* global define */
(function () {
  'use strict';

  /**
   * An implementation of a simple Class in Javascript given a base Constructor
   * Function it generates new constructors.
   *
   * Example usage:
   *
   * ```
   * function Base() {
   *    this.name = 'Base Class';
   * }
   *
   * var Extended = oo.extend(function () {
   *    // call parent's constructor
   *    this._base();
   *
   *    this.type = 'Extended';
   * }, Base);
   *
   * var extended = new Extended();
   * extended.name; // 'Base Class'
   * extended.type; // 'Extended'
   * ```
   *
   * @class oo
   */
  var oo = {
    /**
     * A generic method for creating constructor functions which inherits from
     * another constructor function.
     *
     * Objects created with this class have two "private" attributes:
     *  * _super: If a base method is overriden, the original is saved in this
     *   object
     *  * _base: A reference to the base class' constructor, must be called
     *   in your constructor with valid arguments, example:
     *
     * ```
     * oo.extend(function (arg1, arg2) {
     *   // this must be done in the first line as it will modify the 
     *   // current instance of the object
     *   this._base(arg1);
     *
     *   // now we can just use the object as usual
     *   this.arg2 = arg2;
     * }, MyBaseClass);
     * ```
     *
     * @method extend
     *
     * @param {Constructor Function} constructor A constructor function which will be used
     * to create your new objects
     *
     * @param {Object} methods An optional literal object which specified the
     * shared methods for your new objects instances
     *
     * @param {Class|Constructor Function} base The base "class" this one
     * inherits from
     *
     * @return {Constructor Function} A constructor function for creating new objects
     */
    extend: function (constructor, methods, Base) {
      if(Base === undefined) {
        Base = methods;
        methods = undefined;
      }

      // A generic constructor function we'll return from this method
      function o() {
        /*jshint validthis:true */
        var self = this,
            // this is used to error if the developer forgots to call the base
            // class' constructor!
            wasBaseCalled = false;

        self._base = function () { 
          // _super is a "private" variable all instances have, it's a copy
          // of the base object, so it can be accessed though overrides
          self._super = {};
          Base.apply(self._super, Array.prototype.slice.call(arguments, 0));

          // Call the base class' constructor function again, this time with
          // 'self' context
          Base.apply(self, Array.prototype.slice.call(arguments, 0));

          wasBaseCalled = true;
        };

        constructor.apply(self, Array.prototype.slice.call(arguments, 0));

        if(!wasBaseCalled) {
          throw 'Forgot to call _base()?';
        }
      }

      o.prototype = Object.create ? Object.create(Base.prototype) : new Base();
      o.prototype.constructor = o;

      // If the methods arguments is defined it must be an object
      // literal with all the methods for this "class", store them
      // in the `prototype` so they are stored in a single place in
      // memory, meaning all instances will share the methods
      if(methods !== undefined && typeof methods === 'object') {
        for(var attr in methods) {
          o.prototype[attr] = methods[attr];
        }
      }

      // Finally return the generated constructor function
      return o;
    }
  };

  if(typeof define !== 'undefined') {
    define(oo);
  } else if(typeof module !== 'undefined') {
    module.exports = oo;
  } else {
    window.oo = oo;
  }
})();
