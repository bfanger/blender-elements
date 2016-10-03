// Teach typescript some things
// declare function Symbol(_:string)
declare function require(path:string)
// declare class Promise<T>{}

// interface Document 
// {
//     registerElement<T>(name:string, T) : T
// }

declare var customElements;

interface HTMLElement {
    connectedCallback()
    disconnectedCallback()
    attributeChangedCallback(name:string, oldValue:string, newValue:string)
    
}