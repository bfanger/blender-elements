import style from './Button.scss'
/**
 * A button.
 *
 * Usage:
 *   <b-button>My button</b-button>
 */
export default class Button extends HTMLElement {
  constructor () {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = `
<style>${style}</style>
<button><slot></slot></div>
`
  }
}
// @todo disabled behavior + styling
// @todo icon-text mode
// @todo icon mode (fixed width)
// @todo focus/highlight manager (hover vs focus ) soft-keyboard-focus on mouse-leave.

