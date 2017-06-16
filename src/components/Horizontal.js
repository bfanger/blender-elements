import style from './Horizontal.scss'
export default class Horizontal extends HTMLElement {
  constructor () {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = `
<style>${style}</style>
<slot></slot>
`
  }
}
