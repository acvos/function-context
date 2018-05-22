var pipe = require('function-pipe')
var state = require('./index')

var store = state.createState({
    a: 100
})

var double = state.lift(function (number) {
    return number * 2;
})

var p = pipe(
    state.get('a'),
    double,
    state.store('b')
)

console.log(p(store))
