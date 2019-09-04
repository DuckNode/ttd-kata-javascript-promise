'use strict'
const SuperDevilPromise = require('./newPromise')

let p1, p2, p3, p4, p5

function run() {
    p1 = new SuperDevilPromise((res)=>{res("1")})
    p2 = p1.then((val)=>{
        printPromises();
        return val+"2"
    })
    p3 = p2.then((val)=>{
        printPromises();
        return val+"3"
    })
    p4 = p3.then((val)=>{
        printPromises();
        return val+"4"
    })
    p5 = p4.then((val)=>{
        printPromises();
        return val+"5"
    })
    printPromises();
}

run()

function printPromises() {
    console.log(p1);
    console.log(p2);
    console.log(p3);
    console.log(p4);
    console.log(p5);
}
