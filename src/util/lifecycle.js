
const beforeMount = Symbol('beforeMount')

export default {
  /**
   *
   */
  connected (element) {
    for (const callback of element[beforeMount]) {
      callback.call(element)
    }
  },
  registerBeforeMount (Element, callback) {
    Element.prototype[beforeMount] = Element.prototype[beforeMount] || []
    Element.prototype[beforeMount].push(callback)
  }
}
