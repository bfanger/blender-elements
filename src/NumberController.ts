import noop from "./noop"
import evaluate from "./evaluate"

class NumberController {

    private value: number
    private confirmedValue: number
    private min: number
    private max: number
    private step: number
    private digits: number

    constructor(options) {
        this.setValue(options.value)
        this.setStep(options.step)
        this.setDigits(options.digits)
    }

    getValue():number {
        return this.value
    }
    valueString():string {
        if (isNaN(this.value)) {
            return ''
        }
        if (isNaN(this.digits)) {
            return this.value.toString()
        } else {
            return this.value.toFixed(this.digits)
        }
    }
    setValue(value, soft = false):void {
        if (typeof value === 'string') {
            value = evaluate(value)
        } else if (typeof value !== 'number') {
            value = parseFloat(value)
        }
        if (typeof this.max === 'number' && value > this.max) {
            value = this.max
        }
        if (typeof this.min === 'number' && value < this.min) {
            value = this.min
        }
        if (isNaN(this.digits) === false) {
            const factor = Math.pow(10, this.digits)
            value = Math.round(value * factor) / factor;
        }
        if (isNaN(value)) {
            value = this.confirmedValue 
        }
        if (this.value !== value) {
            this.value = value
        }
    }
    increase() {
        this.setValue(this.value + this.step);
    }
    decrease() {
        this.setValue(this.value - this.step);
    }
    setOffset(offset) {
        this.setValue(this.confirmedValue + (offset * this.step));
    }
    confirmValue(value?) {
        if (arguments.length === 1) {
            this.setValue(value)
        }
        this.confirmedValue = this.value
    }
    restore() {
        this.value = this.confirmedValue 
    }
    setStep(stepSize) {
        this.step = parseFloat(stepSize) || 1;
    }
    // fraction digits
    setDigits(digits) {
        this.digits = parseInt(digits, 10)
    }

}
export default NumberController