var curry = require('curry')
var getValue = require('get-value')
var setValue = require('object-path-immutable').set
var context = require('./context')

const Context = context.class

function get(path, state) {
  var oldState = createState(state)

  return new Context(
    getValue(oldState.scope, path),
    oldState
  )
}

function set(path, value, state) {
  var oldState = createState(state)

  return new Context(
    oldState.value,
    setValue(oldState.scope, path, value)
  )
}

function store(path, state) {
  var oldState = createState(state)

  return new Context(
    oldState.value,
    setValue(oldState.scope, path, oldState.value)
  )
}

function lift(f) {
  return function (x) {
    var oldState = createState(x)
    var result = f(oldState.value)

    if (result instanceof State) {
      return result
    }

    return new Context(result, oldState)
  }
}

module.exports = {
  Context: context.class,
  createContext: context.create,
  get: curry(get),
  set: curry(set),
  store: curry(store),
  lift: lift
}
