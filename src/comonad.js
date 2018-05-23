var curry = require('curry')
var getValue = require('get-value')
var setValue = require('object-path-immutable').set
var contextLib = require('./context')

const Context = contextLib.class
const createContext = contextLib.create

function extract(context) {
  return context.value
}

function extend(f) {
  return function (input) {
    const context = createContext(input)

    return new Context(f(context), context)
  }
}

module.exports = {
}
