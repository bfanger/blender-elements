import {Observable} from "rxjs/Observable"

/**
 * A click event (that is canceled when you move the mouse)
 */
function click(element: HTMLElement): Observable<any> {
    return Observable.fromEvent(element, 'mousedown').switchMap(start => {
        return Observable.fromEvent(element, 'mouseup').first().takeUntil(Observable.fromEvent(element, 'mousemove'))
    })
}
export default click