import style from './Button.scss'
export default class Button extends HTMLElement {
  constructor () {
    super()
    console.log(this)
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = `
<style>${style}</style>
<button><slot></slot></div>
`
  }
}
