import React from 'react'
import { storiesOf } from '@storybook/react'
import Page from './components/Page'
import Example from './components/Example'

storiesOf('Button', module)
    .addDecorator(story => (<Page>{story()}</Page>))
    .add('with text', () => (
        <div>
            <h1>&lt;b-button&gt; element</h1>

            <Example code='<b-button>My button</b-button>' />
            <p>Compared to a regular button element, a Blender button will:</p>
            <ul>
                <li>Stretch to the width of the container (display: block)</li>
                <li>When the container is too small the contents will be clipped (overflow: hidden)</li>
                <li>Can be grouped vertically and horizontally</li>
            </ul>
        </div>
    )).add('in a group', () => (
        <div>
            <Example code={
                `<b-row>
    <b-button>Render</b-button>
    <b-button>Animation</b-button>
    <b-button>Audio</b-button>
</b-row>`} />

            <Example code={
                `<b-column>
    <b-button>Translate</b-button>
    <b-button>Rotate</b-button>
    <b-button>Scale</b-button>
</b-column>`} />
        </div>
    ))
