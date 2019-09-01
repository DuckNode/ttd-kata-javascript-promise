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
      let executor = () => {}
      let promise = new SuperDevilPromise(executor)
      expect(promise.state).to.equal('pending')
    })
  })

  describe('when I call then()', function () {
    it('and I have a resolved value, then promise.state is fulfilled', function () {
      let executor = (resolve) => {
        resolve('foo')
      }
      let promise = new SuperDevilPromise(executor)
      expect(promise.state).to.equal('pending')

      let onFulfilledFunction = (value) => {
        return ('bar')
      }
      promise.then(onFulfilledFunction)
      expect(promise.state).to.equal('fulfilled')
    })
    
    it('and I have a reject reason, then promise.state is rejected', function () {
      let executor = (_resolve, reject) => {
        reject('bad things happening!!!')
      }
      let promise = new SuperDevilPromise(executor)
      expect(promise.state).to.equal('pending')

      let onRejectfunction = (reason) => {
        throw new Error(reason)
      }
      promise.then(undefined, onRejectfunction)
      expect(promise.state).to.equal('rejected')
    })
  })
})