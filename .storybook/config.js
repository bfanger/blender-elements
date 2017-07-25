import { configure } from '@storybook/react'
import 'bootstrap/dist/css/bootstrap.min.css'

if (process.env.USE_DIST) {
  require('../dist/blender-elements')
  require('../dist/themes/default.css')
} else {
  require('../src')
}

configure(() => {
  require('../stories/intro')
  require('../stories/buttonStories')
}, module)
