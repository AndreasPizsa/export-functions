const should = require('should');

const exportFunctions = require('./index');

describe('export-functions', function(){

  describe('Parameter guards', function(){
    it('throws if no array is passed', function(){
      exportFunctions.should.throw();
      exportFunctions.bind(this,'string').should.throw();
    });

    it('throws if the array contains elements that aren\'t functions', function(){
      exportFunctions.bind(this,[1]).should.throw();
    });

    it('throws if the array contains an anonymous (unnamed) function', function(){
      exportFunctions.bind(this,[function(){}]).should.throw();
    });

  });

  describe('Invokations with proper arguments',function(){

    function hello() { return arguments.callee.name; }
    function world() { return arguments.callee.name; }

    function checkResult(result) {
      ['hello','world'].forEach(function(i){
        (typeof result[i]).should.be.equal('function');
        result[i]().should.be.equal(i);
      })
    }

    describe('without target object', function(){
      it('returns an object with function names as keys',function(){
        const result = exportFunctions([hello, world]);
        checkResult(result);
      });
    });

    describe('with target object', function(){
      it('returns an object with function names as keys',function(){
        const target = {
          foo: 'bar'
        };
        const result = exportFunctions(target,[hello, world]);
        checkResult(result);
        result.should.equal(target);
        target.foo.should.equal('bar');
      });
    })
  });

});
