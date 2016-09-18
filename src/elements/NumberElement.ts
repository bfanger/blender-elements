import {Observable, BehaviorSubject, Subject, Subscription} from "@reactivex/rxjs"
import buildElement from "../buildElement"
import formatValue from "../helpers/formatNumber"
import click from "../helpers/click"
const style = require("./NumberElement.css")
/**
 * <b-number value="123" step="1" fractiondigits="3">
 * 
 * Attributes:
 *   value: Number defaults to 0
 *   label: String
 *   step: Determine the increment/decrement value. Defaults to 1
 *   fractiondigits: Number of digits after the decimal point.
 */
class NumberElement {

    value$: BehaviorSubject<number>
    step$: BehaviorSubject<number>
    fractionDigits$: BehaviorSubject<number>
    label$: BehaviorSubject<string>
    shadowRoot: HTMLElement
    previousValue: number
    dom: {
        label: HTMLInputElement
        value: HTMLInputElement
        increment: HTMLInputElement
        decrement: HTMLInputElement
        input: HTMLInputElement
    }
    subscriptions: Subscription[]
    
    constructor(element) {
        this.shadowRoot = element['attachShadow']({ mode: 'open' })
        this.subscriptions = []
        this.initialRender()
        this.value$ = new BehaviorSubject(0)
        this.step$ = new BehaviorSubject(1)
        this.fractionDigits$ = new BehaviorSubject(null)
        this.label$ = new BehaviorSubject('')
        element.value$ = this.value$.distinctUntilChanged() 
    }
    attach() {
        //onFocus / input
        this.subscribeTo(Observable.fromEvent(this.dom.input, 'focus'), () => {
            this.previousValue = this.value$.value
            this.dom.input.value = formatValue(this.value$.value, this.fractionDigits$.value).replace(/(\.[0-9])[0]+$/, '$1')
            this.dom.input.select()
            this.dom.input.style.zIndex = '1';
        })
        //onBlur
        this.subscribeTo(Observable.fromEvent(this.dom.input, 'blur'), () => {
            this.dom.value.innerText = formatValue(this.value$.value, this.fractionDigits$.value)
            this.dom.input.style.zIndex = '-1';
        })
        // this.subscribeTo(Observable.fromEvent(this.dom.input, 'input', e => e.target.value), value => {
        //     this.setValue(value)
        // })
        // onEnter
        this.subscribeTo(Observable.fromEvent(this.dom.input, 'keydown').filter(e => e['keyCode'] === 13), () => {
            this.dom.input.blur()
        })
        // onEsc
        this.subscribeTo(Observable.fromEvent(this.dom.input, 'keydown').filter(e => e['keyCode'] === 27), () => {
            this.dom.input.blur()
            this.setValue(this.previousValue)
        })
        this.subscribeTo(click(this.shadowRoot), e => {
            if (e.target === this.dom.increment) {
                this.setValue(this.value$.value + this.step$.value)
            } else if (e.target === this.dom.decrement) {
                this.setValue(this.value$.value + this.step$.value)
            } else {
                this.dom.input.focus()
            }
        })
        this.subscribeTo(this.value$.distinctUntilChanged().combineLatest(this.fractionDigits$.distinctUntilChanged()), ([value, decimals]) => {
            if (parseFloat(this.dom.input.value) !== value) {
                this.dom.value.innerText = formatValue(value, decimals)
            }
        })
        this.subscribeTo(this.label$.distinctUntilChanged(), label => {
            if (label == '') {
                this.dom.label.innerText = ''
            } else {
                this.dom.label.innerText = label + ':'
            }
        })
    }
    detach() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe())
        this.subscriptions.length = 0
    }
    subscribeTo(obserable: Observable<any>, callback): Subscription {
        const subscription = obserable.subscribe(callback)
        this.subscriptions.push(subscription)
        return subscription
    }
    initialRender() {
        this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <b-arrow-left></b-arrow-left>
        <label for="input"></label>
        <b-value></b-value>
        <b-arrow-right></b-arrow-right>
        <input id="input">
        `
        this.dom = {
            input: <HTMLInputElement> this.shadowRoot.querySelector('input'),
            label: <HTMLInputElement> this.shadowRoot.querySelector('label'),
            value: <HTMLInputElement> this.shadowRoot.querySelector('b-value'),
            decrement: <HTMLInputElement> this.shadowRoot.querySelector('b-arrow-left'),
            increment: <HTMLInputElement> this.shadowRoot.querySelector('b-arrow-right')
        }
        this.dom.input.style.zIndex = '-1';
    }
    
    setValue(value) {
        value = parseFloat(value)
        if (isNaN(value)) {
            return;
        }
        if (this.fractionDigits$.value !== null) {
            const factor = Math.pow(10, this.fractionDigits$.value)
            value = Math.round(value * factor) / factor;
        }
        this.value$.next(value)
    }
}

export default buildElement('b-number', NumberElement, {
    value: {
        get() {
            return this.value$.value
        },
        set(value) {
            this.setValue(value)
        }
    },
    label: {
        get() {
            return this.label$.value
        },
        set(value) {
            this.label$.next(value)
        }
    },
    step: {
        get() {
            return this.step$.value
        },
        set(value) {
            value = parseFloat(value) || 1
            this.step$.next(value)
        }
    },
    fractiondigits: {
        get() {
            return this.decimals$.value
        },
        set(value) {
            value = parseInt(value, 10) || 0
            value = value < 0 ? null : value
            this.fractionDigits$.next(value)
            this.setValue(this.value$.value) // Update the value to match the rounding
        }
    }
}) 