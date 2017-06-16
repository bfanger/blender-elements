// import blenderElements from '../dist/blender-elements';
// import '../dist/blender-elements.css';
import '../src'

import React from 'react'

import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'

import Welcome from './Welcome'
import buttonStories from './buttonStories'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)
buttonStories(storiesOf('Button', module))
