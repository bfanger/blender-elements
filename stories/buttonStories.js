import React from 'react'
import { action } from '@storybook/addon-actions'
// import styles from './styles'

export default story => {
  story
        .add('with text', () => <div>
            <h1>&lt;b-button&gt; element</h1>

            <p>Usage:</p>
            <code>
                &lt;b-button&gt;My button&lt;/b-button&gt;
            </code>
            <p>Example:</p>
            <p-panel>
                 <div style={{ maxWidth: 200 }}>
                    <b-button onClick={action('onClick')}>My button</b-button>
                </div>
            </p-panel>
            <p>Compared to a regular button element, a Blender button will:</p>
            <ul>
                <li>Stretch to the width of the container (display: block)</li>
                <li>When the container is too small the contents will be clipped (overflow: hidden)</li>
                <li>Can be grouped vertically and horizontally</li>
            </ul>
        </div>
    )
    .add('in a group', () => <div className='doc__page'>
        <p-panel>
            <b-horizontal>
                <b-button>Render</b-button>
                <b-button>Animation</b-button>
                <b-button>Audio</b-button>
            </b-horizontal>

            <b-vertical style={{ marginTop: '1em' }}>
                <b-button>Translate</b-button>
                <b-button>Rotate</b-button>
                <b-button>Scale</b-button>
            </b-vertical>
        </p-panel>

    </div>)
}
