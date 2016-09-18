import {Observable} from "@reactivex/rxjs"

/**
 * 
 */
function click(element: HTMLElement): Observable<any> {
    // @todo improve touch support?
    return Observable.fromEvent(element, 'mousedown').flatMap(start => {
        return Observable.fromEvent(element, 'mouseup').first().takeUntil(Observable.fromEvent(element, 'mousemove'))
    })
}
export default click