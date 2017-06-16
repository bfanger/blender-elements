import React from 'react'
import { action } from '@storybook/addon-actions'

export default story => {
  story
        .add('with text', () => <div style={styles.panel}>
            <b-button onClick={action('onClick')}>My button</b-button>

            <b-horizontal style={{ marginTop: '1em' }}>
                <b-button>Render</b-button>
                <b-button>Animation</b-button>
                <b-button>Audio</b-button>
            </b-horizontal>

            <b-vertical style={{ marginTop: '1em' }}>
                <b-button>Translate</b-button>
                <b-button>Locate</b-button>
                <b-button>Scale</b-button>
            </b-vertical>
        </div>)
}

const styles = {
  panel: {
    padding: '2em',
    background: '#727272',
    fontSize: 12
  }
}
