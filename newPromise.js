'use strict'

module.exports = class SuperDevilPromise {
    constructor(executor) {
        this.state = "pending"

        const resolve = (value) => {
            this.state = "fulfilled"
            this.value = value
        }

        const reject = (reason) => {
            this.state = "rejected"
            this.reason = reason
        }

        executor(resolve, reject)
    }

    then(onFulfilled) {
        return new SuperDevilPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let newValue = onFulfilled(this.value)
                    resolve(newValue)
                } catch (reason) {
                    reject(String(reason))
                }
            })
        })
    }
}