
const pointerLockEnabled = true && document.head.requestPointerLock

/**
 * Manages a drag and cleanup of event handlers 
 */
class DragController {
    public mouseMove: MouseEvent
    private cumulativeOfset: {
        x: number
        y: number
    }

    constructor(
        public mouseDown: MouseEvent,
        private onMove: (event: MouseEvent, withShift: boolean) => void,
        private onRelease: (event: MouseEvent) => void,
        private onCancel?: () => void
    ) {
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.mouseMove = mouseDown
        window.addEventListener('mousemove', this.onMouseMove)
        window.addEventListener('mouseup', this.onMouseUp)
        window.addEventListener('mousedown', this.onMouseDown)
        window.addEventListener('keydown', this.onKeyDown)
        window.addEventListener('keyup', this.onKeyUp)
        if (pointerLockEnabled) {
            const element = event.target as HTMLElement;
            element.requestPointerLock()
        }
        this.cumulativeOfset = { x: 0, y: 0 }

    }
    public dispose() {
        window.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('mouseup', this.onMouseUp)
        window.removeEventListener('mousedown', this.onMouseDown)
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('keyup', this.onKeyUp)
    }
    public getOffset() {
        return this.cumulativeOfset

    }
    private onMouseMove(event: MouseEvent) {
        if (pointerLockEnabled) {
            this.cumulativeOfset.x += event.movementX
            this.cumulativeOfset.y += event.movementY
        } else {
            this.cumulativeOfset = {
                x: this.mouseMove.clientX - this.mouseDown.clientX,
                y: this.mouseMove.clientY - this.mouseDown.clientY
            }
        }
        this.mouseMove = event
        this.onMove(event, event.shiftKey)
    }

    private onMouseDown(event: MouseEvent) {
        if (event === this.mouseDown) {
            return
        }
        this.dispose();
        if (this.mouseDown.button === 0 && event.button === 2 && this.onCancel) { // Right click to cancel
            this.onCancel()
        } else {
            this.onRelease(event)
        }
        
    }
    private onMouseUp(event: MouseEvent) {
        this.dispose()
        this.onRelease(event)
        if (pointerLockEnabled) {
            document.exitPointerLock()
        }
    }
    private onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape' && this.onCancel) {
            this.dispose()
            this.onCancel()
        }
        if (event.key === 'Shift') {
            this.onMove(this.mouseMove, true)
        }
    }
    private onKeyUp(event: KeyboardEvent) {
        if (event.key === 'Shift') {
            this.onMove(this.mouseMove, false)
        }
    }

}

export default DragController