import {Observable, BehaviorSubject, Subject, Subscription} from "@reactivex/rxjs"
import buildElement from "../buildElement"
const style = require("./NumberElement.css")

class NumberElement {

    value$: BehaviorSubject<number>
    step$: BehaviorSubject<number>
    decimals$: BehaviorSubject<number>
    shadowRoot: HTMLElement
    subscriptions: Subscription[]
    input: HTMLInputElement
    label: HTMLInputElement
    increment: HTMLInputElement
    decrement: HTMLInputElement
    
    constructor(element) {
        this.shadowRoot = element['attachShadow']({ mode: 'open' })
        this.subscriptions = []
        this.html()
        this.value$ = new BehaviorSubject(0)
        this.step$ = new BehaviorSubject(1)
        this.decimals$ = new BehaviorSubject(null)
        element.value$ = this.value$.distinctUntilChanged() 
        this.update = this.update.bind(this)
    }
    attach() {
        this.subscribeTo(Observable.fromEvent(this.input, 'input', e => e.target.value), value => {
            value = this.toNumber(value)
            if (isNaN(value) === false) {
                this.value$.next(value)
            }
        })
        this.subscribeTo(Observable.fromEvent(this.input, 'blur'), () => {
            this.input.value = this.formatValue(this.value$.value, this.decimals$.value)
        })
        this.subscribeTo(Observable.fromEvent(this.input, 'focus'), () => {
            this.input.select()
        })
        this.subscribeTo(Observable.fromEvent(this.input, 'keydown').filter(e => e['keyCode'] === 13), () => {
            this.input.blur()
        })
        this.subscribeTo(Observable.fromEvent(this.increment, 'click'), e => {
            e.preventDefault()
            this.value$.next(this.value$.value + this.step$.value)
        })
        this.subscribeTo(Observable.fromEvent(this.decrement, 'click'), e => {
            e.preventDefault()
            this.value$.next(this.value$.value - this.step$.value)
        })
        this.subscribeTo(this.value$.distinctUntilChanged().combineLatest(this.decimals$.distinctUntilChanged()), this.update)
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
    html() {
        this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <b-arrow-left></b-arrow-left>
        <label for="input">Frame Step:</label>
        <input id="input">
        <b-arrow-right></b-arrow-right>
        `
        this.input = <HTMLInputElement> this.shadowRoot.querySelector('input')
        this.label = <HTMLInputElement> this.shadowRoot.querySelector('label')
        this.decrement = <HTMLInputElement> this.shadowRoot.querySelector('b-arrow-left')
        this.increment = <HTMLInputElement> this.shadowRoot.querySelector('b-arrow-right')
    }
    toNumber(value) {
        if (typeof value === 'number') {
            return value
        }
        return parseFloat(value)
    }
    update([value, decimals]) {
        if (this.toNumber(this.input.value) !== value) {
            this.input.value = this.formatValue(value, decimals)
        }
    }
    formatValue(value, decimals) {
        if (decimals === null) {
            return value
        } else {
            return value.toFixed(decimals)
        }
    }
}

export default buildElement('b-number', NumberElement, {
    value: {
        get() {
            return this.value$.value
        },
        set(value) {
            value = this.toNumber(value)
            if (isNaN(value) === false) {
                this.value$.next(value)
            }
        }
    },
    step: {
        get() {
            return this.step$.value
        },
        set(value) {
            console.log(value)
            value = parseFloat(value) || 1
            value = value < 0 ? 1 : value
            this.step$.next(value)
        }
    },
    decimals: {
        get() {
            return this.decimals$.value
        },
        set(value) {
            value = parseInt(value, 10) || 0
            value = value < 0 ? null : value
            this.decimals$.next(value)
        }
    }
}) 