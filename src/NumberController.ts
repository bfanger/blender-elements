const noop =  () => {};

class NumberController {

    private value: number
    private min: number
    private max: number
    private step: number
    private digits: number
    private default: any

    constructor(options) {
        this.setValue(options.value)
        this.setStep(options.step)
        this.setDigits(options.digits)
        this.default = options.default
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
    setValue(value):void {
        if (typeof value !== 'number') {
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
            value = this.default 
        }
        if (this.value !== value) {
            this.value = value
        }
    }
    resetValue() {
        this.value = NaN
    }
    increase(units = 1) {
        this.setValue(this.value + (units * this.step));
    }
    decrease(units = 1) {
        this.setValue(this.value - (units * this.step));
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