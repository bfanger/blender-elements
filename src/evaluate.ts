
function evaluate(expression) {
    
    if (expression.match(/^-?[0-9]+(\.[0-9]+)?$/)) { // just a number?
        return parseFloat(expression)
    }
    if (expression.match(/^[\(\)0-9\.\*+-\/]+$/)) { // a simple calculation?
        const value = eval(expression)
        if (typeof value === 'number') {
            return value
        }
    }
    // @todo Expose Math constants and functions: `pi` and `sqrt(2)`
    return parseFloat(expression) // i give up, let js try
    
}
export default evaluate