/**
 * Manages a drag and cleanup of event handlers 
 */
class DragController {
    public mouseMove: MouseEvent

    constructor(
        public mouseDown:MouseEvent,
        private onMove: (event:MouseEvent, withShift:boolean) => void,
        private onRelease: (event:MouseEvent) => void,
        private onCancel?: () => void
    ) {
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.mouseMove = mouseDown
        window.addEventListener('mouseup', this.onMouseUp)
        window.addEventListener('mousemove', this.onMouseMove)
        window.addEventListener('keydown', this.onKeyDown)
        window.addEventListener('keyup', this.onKeyUp)
    }
    public dispose() {
        window.removeEventListener('mouseup', this.onMouseUp)
        window.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('keyup', this.onKeyUp)
    }
    public getOffset() {
        return {
            x: this.mouseMove.clientX - this.mouseDown.clientX,
            y: this.mouseMove.clientY - this.mouseDown.clientY
        }
    }    
    private onMouseMove(event:MouseEvent) {
        this.mouseMove = event
        this.onMove(event, event.shiftKey)
    }

    private onMouseUp(event:MouseEvent) {
        this.dispose()
        this.onRelease(event)
    }
    private onKeyDown(event:KeyboardEvent) {
        if (event.key === 'Escape' && this.onCancel) {
            this.dispose()
            this.onCancel()
        }
        if (event.key === 'Shift') {
            this.onMove(this.mouseMove, true)
        }
    }
    private onKeyUp(event:KeyboardEvent) {
        if (event.key === 'Shift') {
            this.onMove(this.mouseMove, false)
        }
    }
    
}

export default DragController