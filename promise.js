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

        if (this.value) {
            try {
                return this.fulfillPromise(onFulfilled);

            } catch (fulfillPromiseError) {
                return this.rejectPromise(fulfillPromiseError.text);
            }
        }

    }

    fulfillPromise(fulfillmentCallback) {
        let newValue = fulfillmentCallback(this.value);
        this.state = 'fulfilled'
        this.reason = undefined;
        return new SuperDevilPromise((resolve) => {
            resolve(newValue);
        });
    }

    rejectPromise(reason) {
        this.state = 'rejected'
        this.value = undefined;
        return new SuperDevilPromise((resolve, reject) => {
            reject(reason);
        });
    }

}