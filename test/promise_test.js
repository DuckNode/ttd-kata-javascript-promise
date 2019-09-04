'use strict'

const expect = require('chai').expect
const SuperDevilPromise = require('../newPromise')

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
      let noResolveOrRejectExecutor = () => {}
      let promise = new SuperDevilPromise(noResolveOrRejectExecutor)
      expect(promise.state).to.equal('pending')
    })
    it('and my executor has a resolve call, then promise.state is fulfilled', function () {
      let resolveExecutor = (resolve) => {
        resolve('foo')
      }
      let promise = new SuperDevilPromise(resolveExecutor)
      expect(promise.state).to.equal('fulfilled')
      expect(promise.value).to.equal('foo')
    })
    it('and my executor has a reject call, then promise.state is rejected', function () {
      let rejectExecutor = (_resolve, reject) => {
        reject('bar')
      }
      let promise = new SuperDevilPromise(rejectExecutor)
      expect(promise.state).to.equal('rejected')
      expect(promise.reason).to.equal('bar')
    })
  })

  describe('when I call then()', function () {
    let simpleExecutor = (resolve) => {
      resolve('foo')
    }
    let simpleOnFulfilled = (value) => {
      return value + 'bar'
    }
    let onFulfilledWithError = () => {
      throw new Error("unexpected error")
    }
    let mitigateReject = (reason) => {
      return String(reason)
    }

    it('and I have a resolved value, then promise.state is fulfilled', async function () {
      let promise = new SuperDevilPromise(simpleExecutor).then(simpleOnFulfilled)
      expect(promise.state).to.equal('pending')
      expect(promise.value).to.equal(undefined)

      await promise
      expect(promise.state).to.equal('fulfilled')
      expect(promise.value).to.equal('foobar')
    })

    it('and I have a rejected reason, then promise.state is rejected', async function () {
      let promise = new SuperDevilPromise(simpleExecutor).then(onFulfilledWithError)
      expect(promise.state).to.equal('pending')

      await promise
      // await promise.then(undefined, mitigateReject)

      expect(promise.state).to.equal('rejected')
      expect(promise.reason).to.equal('Error: unexpected error')
    })

  })
})