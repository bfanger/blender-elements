// import blenderElements from '../dist/blender-elements';
// import '../dist/blender-elements.css';
import '../src'

import React from 'react'
import { storiesOf } from '@storybook/react'
import Welcome from './Welcome'
import buttonStories from './buttonStories'
import './documentation.scss'

storiesOf('Welcome', module).add('to Blender Elements', () => <Welcome />)
buttonStories(storiesOf('Button', module))
