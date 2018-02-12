import { configure } from '@storybook/react'

function loadStories() {
  require('../stories')
  require('../stories/range')
}

configure(loadStories, module)
