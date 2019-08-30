'use strict'

const expect = require('chai').expect
const SuperDevilPromise = require('../promise')

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(4)).to.equal(-1)
    })
  })
})

describe('given SuperDevilPromise class', function () {

  describe('when I instantiate promise', function () {
    it('then promise.state is pending', function () {
      let emptyfunction = () => {}
      let promise = new SuperDevilPromise(emptyfunction)
      expect(promise.state).to.equal('pending')
    })
  })

  describe('when I call then()', function () {
    it('and I have a resolved value, then promise.state is fulfilled', function () {
      let resolvingFunction = (resolve) => {
        resolve('foo')
      }
      let promise = new SuperDevilPromise(resolvingFunction)
      expect(promise.state).to.equal('pending')

      let returningFunction = (value) => {
        return ('bar')
      }
      promise.then(returningFunction)
      expect(promise.state).to.equal('fulfilled')
    })
  })
})