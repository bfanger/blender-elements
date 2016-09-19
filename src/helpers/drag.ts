import {Observable} from "rxjs/Observable"

/**
 * Create a mousedrag observable
 */
function drag(elements) : Observable<any> {
    const mouseup$ = Observable.fromEvent(window, 'mouseup')
    if (Array.isArray(elements) == false) {
        elements = [elements]
    }
    return Observable.merge(...elements.map(element => {
        return Observable.fromEvent(element, 'mousedown')
    })).map(event => {
        event['move$'] = Observable.fromEvent(window, 'mousemove').takeUntil(mouseup$);
        event['up$'] = mouseup$.take(1)
        return event
    });
}
export default drag 