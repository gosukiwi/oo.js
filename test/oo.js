/* global describe, it */
'use strict';

var assert = require('assert'), 
    oo = require('../src/oo');

describe('oo', function () {
  describe('#extend()', function () {
    it('should work with a simple base constructor function', function () {
      function A() {
        this.name = 'A';
      }

      var B = oo.extend(function () {
        this._base();
        this.age = 11;
      }, A);

      var b = new B();

      assert.equal('A', b.name);
      assert.equal(11, b.age);
    });

    it('should be able to access overriden attributes', function () {
      function A() {
        this.name = 'A';
      }

      var B = oo.extend(function () {
        this._base();
        this.name = 'B';
        this.age = 11;
      }, A);

      var b = new B();

      assert.equal('B', b.name);
      assert.equal('A', b._super.name);
      assert.equal(11, b.age);
    });

    it('should pass arguments to base class', function () {
      function A(name) {
        this.name = name;
      }

      var B = oo.extend(function (name, age) {
        this._base(name);
        this.age = age;
      }, A);

      var b = new B('A', 11);

      assert.equal('A', b.name);
      assert.equal(11, b.age);
    });
  });
});
