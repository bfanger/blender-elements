import {Observable, BehaviorSubject, Subject, Subscription} from "@reactivex/rxjs"
import buildElement from "../buildElement"
import formatValue from "../helpers/formatNumber"
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
    subscriptions: Subscription[]
    input: HTMLInputElement
    label: HTMLInputElement
    increment: HTMLInputElement
    decrement: HTMLInputElement
    
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
        this.subscribeTo(Observable.fromEvent(this.input, 'input', e => e.target.value), value => {
            this.setValue(value)
        })
        this.subscribeTo(Observable.fromEvent(this.input, 'blur'), () => {
            this.input.value = formatValue(this.value$.value, this.fractionDigits$.value)
        })
        this.subscribeTo(Observable.fromEvent(this.input, 'focus'), () => {
            this.input.select()
        })
        this.subscribeTo(Observable.fromEvent(this.input, 'keydown').filter(e => e['keyCode'] === 13), () => {
            this.input.blur()
        })
        this.subscribeTo(Observable.fromEvent(this.increment, 'click'), e => {
            e.preventDefault()
            this.setValue(this.value$.value + this.step$.value)
        })
        this.subscribeTo(Observable.fromEvent(this.decrement, 'click'), e => {
            e.preventDefault()
            this.setValue(this.value$.value - this.step$.value)
        })
        this.subscribeTo(this.value$.distinctUntilChanged().combineLatest(this.fractionDigits$.distinctUntilChanged()), ([value, decimals]) => {
            if (parseFloat(this.input.value) !== value) {
                this.input.value = formatValue(value, decimals)
            }
        })
        this.subscribeTo(this.label$.distinctUntilChanged(), label => {
            this.label.innerText = label
            if (label != '') {
                this.label.innerText += ':'
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
        <input id="input">
        <b-arrow-right></b-arrow-right>
        `
        this.input = <HTMLInputElement> this.shadowRoot.querySelector('input')
        this.label = <HTMLInputElement> this.shadowRoot.querySelector('label')
        this.decrement = <HTMLInputElement> this.shadowRoot.querySelector('b-arrow-left')
        this.increment = <HTMLInputElement> this.shadowRoot.querySelector('b-arrow-right')
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