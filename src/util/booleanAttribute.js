import lifecycle from './lifecycle'

export default function booleanAttribute (Element, attribute, callback) {
  // Initial render
  lifecycle.registerBeforeMount(Element, function () {
    callback.call(this, this.hasAttribute(attribute))
  })
  // Updates
  Element.observedAttributes = Element.observedAttributes || []
  Element.observedAttributes.push(attribute)
  const original = Element.prototype.attributeChangedCallback
  Element.prototype.attributeChangedCallback = function (_attribute, previous, next, namespace) {
    if (_attribute === attribute) {
      callback.call(this, next !== null)
    }
    if (original) {
      return original.apply(this, arguments)
    }
  }
  // Property access
  Object.defineProperty(Element.prototype, attribute, {
    enumerable: true,
    get () {
      return this.hasAttribute(attribute)
    },
    set (value) {
      if (value) {
        this.setAttribute(attribute, '')
      } else {
        this.removeAttribute(attribute)
      }
    }
  })
}
