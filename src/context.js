var getValue = require('get-value')
var setValue = require('object-path-immutable').set

function Context(value, initialState) {
  this.value = value

  if (typeof initialState !== 'object') {
    throw new Error('[SimpleState] Context must be an object, got ' + (typeof initialState))
  }

  if (initialState instanceof Context) {
    this.scope = initialState.scope
  } else {
    this.scope = initialState
  }
}

Context.prototype.current = function () {
  return this.value
}

Context.prototype.get = function (path) {
  return getValue(this.scope, path)
}

Context.prototype.set = function (path, value) {
  this.scope = setValue(this.scope, path, value)
}

function createContext(data) {
  if (data instanceof Context) {
    return data
  }

  return new Context(undefined, data || {})
}

module.exports = {
  create: createContext,
  class: Context
}
