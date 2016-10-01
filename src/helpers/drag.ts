import {Observable} from "rxjs/Observable"

/**
 * Create a mousedrag observable
 */
function drag(elements) : Observable<any> {
    const mouseup$ = Observable.fromEvent<MouseEvent>(window, 'mouseup')
    if (Array.isArray(elements) == false) {
        elements = [elements]
    }
    return Observable.merge<MouseEvent>(...elements.map(element => {
        return Observable.fromEvent<MouseEvent>(element, 'mousedown')
    })).map((event:any) => {
        event.move$ = Observable.fromEvent<MouseEvent>(window, 'mousemove').takeUntil(mouseup$);
        event.up$ = mouseup$.take(1)
        return event
    });
}
export default drag 