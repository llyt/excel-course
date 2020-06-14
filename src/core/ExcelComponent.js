import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  // Setup component before init
  prepare() {}

  // Return component template
  toHTML() {
    return ''
  }

  // Notice listeners about 'event'
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Subscribe on 'event'
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Initialize component
  // Add DOM listeners
  init() {
    this.initDOMListeners()
  }

  // Delete component
  // Clean up listeners and
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
  }
}
