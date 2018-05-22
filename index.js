var curry = require('curry')
var getValue = require('get-value')
var setValue = require('object-path-immutable').set

function State(value, initialState) {
  this.value = value

  if (typeof initialState !== 'object') {
    throw new Error('[SimpleState] Scope must be an object, got ' + (typeof initialState))
  }

  if (initialState instanceof State) {
    this.scope = initialState.scope
  } else {
    this.scope = initialState
  }
}

function createState(data) {
  if (data instanceof State) {
    return data
  }

  return new State(undefined, data || {})
}

function get(path, state) {
  var oldState = createState(state)

  return new State(
    getValue(oldState.scope, path),
    oldState
  )
}

function set(path, value, state) {
  var oldState = createState(state)

  return new State(
    oldState.value,
    setValue(oldState.scope, path, value)
  )
}

function store(path, state) {
  var oldState = createState(state)

  return new State(
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

    return new State(result, oldState)
  }
}

module.exports = {
  createState: createState,
  State: State,
  get: curry(get),
  set: curry(set),
  store: curry(store),
  lift: lift
}
