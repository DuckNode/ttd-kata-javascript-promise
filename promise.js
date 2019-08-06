'use strict'

module.exports = class CoolPromise {

    constructor(executor) {

        this.state = 'pending'

        const resolve = (value) => {
            this.value = value
        }
        const reject = (reason) => {
            this.reason = reason
        }

        executor(resolve, reject)
    }

    then(onFulfilled) {
        if(this.value) { 
            this.state = 'fulfilled'
            onFulfilled(this.value)
        }
    }

    catch (onRejected) {
        if(this.reason) {
            this.state = 'rejected'
            onRejected(this.reason)
        }
    }
}