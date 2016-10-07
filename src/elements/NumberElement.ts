import NumberController from "../NumberController"
    import DragController from "../DragController"
import render from "../render"
const style = require("./NumberElement.css")

const dom = render(`
<label class="${style.number}">
<span ref="left" class="${style['left-arrow']}"></span>
<span ref="label" class="${style.number__label}"></span>
<span ref="value" class="${style.number__value}" aria-hidden="true"></span>
<span ref="right" class="${style['right-arrow']}"></span>
<input ref="input" class="${style.number__input}">
</label>
`)

class NumberElement extends HTMLElement {
    public value:number
    private controller: NumberController

    constructor(element:NumberElement) {
        super()
        element.controller = new NumberController({
            value: element.getAttribute('value'),
            step: element.getAttribute('step'),
            digits: element.getAttribute('digits'),
            default: 0
        })
        Object.defineProperty(element, 'value', {
            get() {
                return element.controller.getValue()
            },
            set(value) {
                element.controller.confirmValue(value)
                element.render()
            }
        })
        
    }

    static get observedAttributes() {
        return ['value', 'min', 'max', 'soft-min', 'soft-max', 'step', 'digits']
    }
    connectedCallback() {
        this.appendChild(dom.cloneNode(true))
        const refs = {
            label: this.querySelector('[ref="label"]') as HTMLSpanElement,
            value: this.querySelector('[ref="value"]') as HTMLSpanElement,
            left: this.querySelector('[ref="left"]') as HTMLSpanElement,
            right: this.querySelector('[ref="right"]') as HTMLSpanElement,
            input: this.querySelector('[ref="input"]') as HTMLInputElement, 
        }
        refs.label.textContent = this.getAttribute('label')
        refs.input.value = this.controller.valueString()
        refs.value.textContent = this.controller.valueString()

        const state = {
            mouseMoved: false
        }
        refs.input.onfocus = e => {
            refs.input.value = this.controller.valueString().replace(/\.0[0]+/, '.0')
            refs.input.select()
        }
        refs.input.onblur = e => {
            refs.value.textContent = this.controller.valueString()
            this.controller.confirmValue()
        }
        refs.input.onkeydown = e => {
            if (e.keyCode == 27) { // ESC
                this.controller.restore()
                refs.input.blur()
            }
            if (e.keyCode === 13) { // Enter
                this.controller.setValue(refs.input.value)
                refs.input.blur()
            }
        }
        const moveThreshold = 5

        refs.input.onmousedown = (event) => {
            event.preventDefault()
            state.mouseMoved = false
            const drag = new DragController(event, (move, withShift) => {
                const offsetX = drag.getOffset().x
                if (state.mouseMoved === false && Math.abs(offsetX) < moveThreshold) {
                    return
                }
                state.mouseMoved = true
                refs.input.classList.add(style['number__input--active'])
                const factor = withShift ? 0.1 : 1
                this.controller.setOffset(offsetX * factor)
                refs.input.value = this.controller.valueString()
            }, () => {
                if (state.mouseMoved) {
                    refs.input.classList.remove(style['number__input--active'])
                    this.controller.confirmValue()
                    this.render()
                    return
                }
                const leftArrow = refs.left.getBoundingClientRect()
                if (leftArrow.left < event.clientX && leftArrow.right > event.clientX) {
                    this.controller.decrease()
                    this.render()
                    return;
                }
                const rightArrow = refs.right.getBoundingClientRect()
                if (rightArrow.left < event.clientX && rightArrow.right > event.clientX) {
                    this.controller.increase()
                    this.render()
                    return;
                }
                refs.input.focus()
            }, () => {
                this.controller.restore()
                refs.input.classList.remove(style['number__input--active'])
            })
        }
        
        // refs.input.onmousemove = e => {
        //     if (state.mouseDown === null) {
        //         return
        //     }
        
        // }
    }
    disconnectedCallback() {
        console.log('disconnected')
        this.children.item(0).remove();
    }
    attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        switch (name) {
            case 'value':
                this.controller.confirmValue(newValue)
                break;
            case 'step':
                this.controller.setStep(newValue)
                break;
            case 'digits':
                this.controller.setValue(newValue)
                break;
            default:
                console.warn(name, newValue, 'was', oldValue)
        }
    }
    private render() {
        var display = this.querySelector('[ref="value"]') as HTMLSpanElement;
        const value = this.controller.valueString()
        this.setAttribute('value', value)
        if (display) {
            display.textContent = value
        }
    }
}


customElements.define('b-number', NumberElement);

export default NumberElement 