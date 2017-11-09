import React from 'react'

import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import Spinner from '../src/components/react/Indicator'

storiesOf('Spinner', module)
  .add('default', () => <Spinner />)
  .add('huge and pink', () => <Spinner size="64" color="#FA1C86" />)
  .add('huge and pink with wider border', () => <Spinner size={64} color="#FA1C86" style={{ borderWidth: '8px' }} />)
  .add('with id', () => <Spinner id="withID" />)
