/**
 * Formats number to fixed amount of digits
 * When no fractionDigits are given the number is formated as-is. 
 */
function formatValue(value:number, fractionDigits:number):string {
    if (fractionDigits === null || typeof fractionDigits === 'undefined') {
        return value.toString()
    } else {
        return value.toFixed(fractionDigits)
    }
}
export default formatValue