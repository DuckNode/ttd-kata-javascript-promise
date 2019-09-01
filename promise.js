'use strict'

module.exports = class SuperDevilPromise {

    constructor(executor) {

        this.state = 'pending'

        const resolve = (value) => {
            this.value = value
            this.reason = undefined
        }
        const reject = (reason) => {
            this.reason = reason
            this.value = undefined
        }

        executor(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        try {
            return this.fulfill(this.value ? onFulfilled : onRejected);
        } catch (settleError) {
            return this.reject(settleError);
        }
    }

    fulfill(cb) {
        this.state = 'fulfilled'
        let newValue = cb(this.value);
        return new SuperDevilPromise((resolve) => {
            resolve(newValue);
        });
    }

    reject(settleError) {
        this.state = 'rejected';
        return new SuperDevilPromise((_resolve, reject) => {
            reject(settleError);
        });
    }

}