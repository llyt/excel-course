export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Notice listeners if they exist
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
    return true
  }

  // on, listen
  // Add new listener
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter((listener) => listener !== fn)
    }
  }
}
