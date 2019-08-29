'use strict'

module.exports = class SuperDevilPromise {

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
        if (this.value) {
            this.state = 'fulfilled'

            try {
                this.value = onFulfilled(this.value)
                this.reason = undefined

                return new SuperDevilPromise((resolve) => {
                    resolve(this.value)
                })

            } catch (callbackReject) {
                this.value = undefined
                this.reason = callbackReject

                return new SuperDevilPromise((resolve, reject) => {
                    reject(callbackReject)
                })
            }
        }

    }

    catch (onRejected) {
        if (this.reason) {
            this.state = 'rejected'

            try {
                this.value = onRejected(this.reason)
                this.reason = undefined

                return new SuperDevilPromise((resolve) => {
                    resolve(this.value)
                })

            } catch (callbackReject) {
                this.value = undefined
                this.reason = callbackReject

                return new SuperDevilPromise((resolve, reject) => {
                    reject(callbackReject)
                })
            }
        }
    }

}