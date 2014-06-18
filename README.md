# Javascript Object Oriented goodies
To inherit a class in regular Javascript you can do

    function MyClass() {
      // call base constructor
      MyBaseClass.apply(this);

      /* code... */
    }

    MyClass.prototype = Object.create(MyBaseClass.prototype);
    MyClass.prototype.constructor = MyClass;

Not complicated but surely could be easier, `oo.extend` is just a wrapper
around that idea:

    var MyClass = oo.extend(function () {
      // call base constructor
      this._base();

      /* code... */
    }, MyBaseClass);

You also get a `_super` attribute which references to an instance of the base
class, so you can access the base class attributes even if you override them.
Check this example, straight from the tests:

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

## Bulding

You can run `make test` to run tests, you'll need `mocha` though which you can
install by simply running `npm install`.

As for the API reference you can run `make doc`, you'll need `yuidoc` to 
build the documentation though `npm install -g yuidocjs`.
