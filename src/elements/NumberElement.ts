/**
 * Blender's "Number Button"
 * https://www.blender.org/manual/interface/controls/buttons/number.html
 * 
 * An full featured alternative for an <input type="number">
 */
import NumberController from "../NumberController"
import DragController from "../DragController"
import render from "../render"
const style = require("./NumberElement.scss")

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

    static get observedAttributes() {
        return ['value', 'step', 'digits']
    }
    
    constructor(element:NumberElement) {
        super()
        element.controller = new NumberController({
            value: element.getAttribute('value'),
            step: element.getAttribute('step'),
            digits: element.getAttribute('digits')
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

    connectedCallback() {
        this.appendChild(dom.cloneNode(true))
        const refs = {
            label: this.querySelector('[ref="label"]') as HTMLSpanElement,
            value: this.querySelector('[ref="value"]') as HTMLSpanElement,
            left: this.querySelector('[ref="left"]') as HTMLSpanElement,
            right: this.querySelector('[ref="right"]') as HTMLSpanElement,
            input: this.querySelector('[ref="input"]') as HTMLInputElement, 
        }
        if (this.getAttribute('label')) {
            refs.label.textContent = this.getAttribute('label')
        } else {
            refs.label.classList.add(style['number__label--empty'])
        }
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
            this.controller.confirmValue(refs.input.value)
            this.render()
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
            if (event.button !== 0 || document.activeElement === refs.input) {
                return
            }
            event.preventDefault()
            state.mouseMoved = false
            const drag = new DragController(event, (move, withShift) => {
                // mouseMove
                const offsetX = drag.getOffset().x
                if (state.mouseMoved === false && Math.abs(offsetX) < moveThreshold) {
                    return
                }
                state.mouseMoved = true
                refs.input.classList.add(style['number__input--active'])
                const factor = withShift ? 0.1 : 1
                // @todo discrete step when dragging with ctrl
                this.controller.setOffset(offsetX * factor)
                refs.input.value = this.controller.valueString()
            }, () => {
                // mouseUp
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
                refs.input.blur()
            })
        }
        refs.input.onmousewheel = e => {
            if (e.ctrlKey === false || document.activeElement === refs.input) {
                return;
            }
            e.preventDefault()
            if (e.deltaY < 0) {
                this.controller.increase()
            } else {
                this.controller.decrease()
            }
            this.render()
        }
    }
    disconnectedCallback() {
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