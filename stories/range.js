import React from 'react'

import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import Range from '../src/components/react/Range/index'

storiesOf('Range', module)
  .add('default', () => <Range max={10} min={2} step={1} value={5} />)
  .add('rtl range', () => <Range max={10} min={1} step={1} value={3} rtl />)
  .add('vertical range', () => <Range max={10} min={1} step={1} value={3} vertical />)
  .add('vertical and rtl range', () => <Range max={10} min={1} step={1} value={3} vertical rtl />)
