/**
 * 
 */
function render(html:string): Element {
    const div = document.createElement('div')
    div.innerHTML = html
    if (div.children.length !== 1) {
        console.log(div.innerHTML)
        throw new Error('Template should have contain only one element')
    }
    return div.children.item(0) 
}
export default render