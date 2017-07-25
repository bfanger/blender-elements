/* eslint react/jsx-no-target-blank: "off"*/
import React, { Component } from 'react'
import { linkTo } from '@storybook/addon-links'

export default class Welcome extends Component {

  render () {
    return (
      <div>
        <h1>Blender Elements</h1>
        <p>Bringing the UI controls from the <a href='https://blender.org/' target='_blank'>Blender</a> (the open source 3D creation suite) to the web.</p>

        <h3>Desktop first</h3>
        <p>Focusses on increasing productivity on desktop and taking advantage of things like: hover-state, click-and-drag, rightclick, keyboard shortcuts, etc.</p>

        <h3>Build as WebComponents</h3>
        <p>
          Build with native web technologies, lightweight (no dependancies).<br />
          Framework agnostic, works standalone but can be used in Angular, React, Vue and other frameworks that support webcomponents.
        </p>

        <p>
          Blender Elements uses React Storybook to document the components, but using the library doesn&apos;t require React.
        </p>
        <a onClick={linkTo('Button')}>Continue</a>
      </div>
    )
  }
}
