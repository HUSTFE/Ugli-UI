import React from 'react'

import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import Spinner from '../src/components/react/Indicator'
import Button from '../src/components/react/Button/index'
import Swipe from '../src/components/react/Swipe'

storiesOf('Spinner', module)
  .add('default', () => <Spinner />)
  .add('huge and pink', () => <Spinner size="64" color="#FA1C86" />)
  .add('huge and pink with wider border', () => <Spinner size={64} color="#FA1C86" style={{ borderWidth: '8px' }} />)
  .add('with id', () => <Spinner id="withID" />)

storiesOf('Button', module)
  .add('default', () => <Button text="Button" />)

// Swipe Component
storiesOf('Swipe', module)
  .add('default', () => <Swipe />)
