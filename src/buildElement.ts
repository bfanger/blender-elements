const controller = Symbol('controller');

function buildElement(tag:string, Element, properties:Object) {
    const keys = Object.keys(properties)

    class CustomElement extends HTMLElement {

        createdCallback() {
            this[controller] = new Element(this)
            for (const attribute of keys) {
                const property = properties[attribute] 
                if (this.hasAttribute(attribute)) {
                    const value = this.getAttribute(attribute)
                    property.set.call(this[controller], value)
                }
                Object.defineProperty(this, attribute, {
                    get: function() { 
                        const property = properties[attribute]
                        return property.get.call(this[controller]) 
                    },
                    set: function(value) { 
                        const property = properties[attribute]
                        this.setAttribute(attribute, value);
                        property.set.call(this[controller], value) // is already triggered setAttribute
                    },
                })
            }
        }
    
        static get observedAttributes() {
            return keys;
        }

        attributeChangedCallback(attribute, _, value) {
            if (properties[attribute]){
                const property = properties[attribute]
                property.set.call(this[controller], value)
            }
        }

        attachedCallback() {
            this[controller].attach()
        }
        detachedCallback() {
            this[controller].detached()
        }
    }

    return document.registerElement(tag, CustomElement)
}

export default buildElement