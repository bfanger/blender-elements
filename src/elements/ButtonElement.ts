import render from "../render"
const style = require("./ButtonElement.scss")

const dom = render(`
<button class="${style.button}">
    <img class="${style.button__icon}" ref="icon"/>
    <span class="${style.button__label}" ref="label"></span>
</button>
`)

class ButtonElement extends HTMLElement {
    public icon:string
    public label:string

    static get observedAttributes() {
        return ['label', 'icon']
    }
        
    constructor(element:ButtonElement) {
        super()
        const label = element.textContent as string;
        if (label !== '' && element.hasAttribute('label') === false) {
            element.setAttribute('label', label);
            element.innerHTML = ''
        }
        Object.defineProperty(element, 'icon', {
            get() {
                return element.getAttribute('icon')
            },
            set(value) {
                element.setAttribute('icon', value)
                element.render()
            }
        })
        Object.defineProperty(element, 'label', {
            get() {
                return element.getAttribute('label')
            },
            set(value) {
                element.setAttribute('label', value)
                element.render()
            }
        })
    }
    attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        this.render()
    }

    connectedCallback() {
        this.appendChild(dom.cloneNode(true))
        this.render()
    }
    disconnectedCallback() {
        this.children.item(0).remove();
    }
    private render() {
        const icon = this.querySelector('[ref="icon"]') as HTMLImageElement
        if (!icon) {
            return
        }
        if (this.hasAttribute('icon')) {
            icon.src = this.getAttribute('icon') as string 
        } else {
            icon.removeAttribute('src') 
        }
        const label = this.querySelector('[ref="label"]') as HTMLSpanElement
        if (this.hasAttribute('label')) {
            label.textContent = this.getAttribute('label') as string 
        } else {
            label.textContent = '' 
        }
    }
}

customElements.define('b-button', ButtonElement);

export default ButtonElement 