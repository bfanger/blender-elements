import {Observable, BehaviorSubject, Subject, Subscription} from "@reactivex/rxjs"
import buildElement from "../buildElement"

class NumberElement {

    value$: BehaviorSubject<number>
    shadowRoot: HTMLElement
    subscriptions: Subscription[]
    input: HTMLInputElement
    
    constructor(element) {
        this.shadowRoot = element['attachShadow']({ mode: 'open' })
        this.subscriptions = []
        this.html()
        this.value$ = new BehaviorSubject(0)
        element.value$ = this.value$.distinctUntilChanged() 
        this.update = this.update.bind(this)
    }
    attach() {
        this.subscriptions.push(Observable.fromEvent(this.input, 'input', e => e.target.value).subscribe(value => {
            value = this.toNumber(value)
            if (isNaN(value) === false) {
                this.value$.next(value)
            }
        }))
        this.subscribeTo(Observable.fromEvent(this.input, 'blur'), () => {
            this.input.value = this.value$.value.toString()
        })
        this.subscriptions.push(this.value$.distinctUntilChanged().subscribe(this.update))
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
        <style>
        </style>
            Number<input>
        `
        this.input = <HTMLInputElement> this.shadowRoot.querySelector('input')
    }
    toNumber(value) {
        if (typeof value === 'number') {
            return value
        }
        return parseFloat(value)
    }
    update(value) {
        console.log('render', value)
        if (this.toNumber(this.input.value) !== value) {
            this.input.value = value
        }
    }
}

export default buildElement('b-number', NumberElement, {
    value: {
        get() {
            return this.value
        },
        set(value) {
            value = this.toNumber(value)
            if (isNaN(value) === false) {
                this.value$.next(value)
            }
        }
    }
}) 