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

describe('SuperDevilPromise class', function () {
  
  describe('when I instantiate a superDevil', function () {
    it('then superDevil.state is pending', function () {
      let emptyfunction = () => {}
      let promise = new SuperDevilPromise(emptyfunction)
      expect(promise.state).to.equal('pending')
    })
  })

  describe('when I call then() and I have a resolved value', function () {
    it('then superDevil.state is fulfilled', function () {
      let resolvingFunction = (resolve) => {
        resolve(1)
      }
      let promise = new SuperDevilPromise(resolvingFunction)
      expect(promise.state).to.equal('pending')

      let returningFunction = (value) => {
        return 2
      }
      promise.then(returningFunction)
      expect(promise.state).to.equal('fulfilled')
    })
  })
})