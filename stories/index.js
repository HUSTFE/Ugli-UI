import React from 'react'

import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import Spinner from '../src/components/react/Indicator'
import Button from '../src/components/react/Button/index'
import Calendar from '../src/components/react/Calendar/index'

storiesOf('Indicator/Default(Spinner)', module)
  .add('default', () => <Spinner />)
  .add('huge and pink', () => <Spinner size="64" color="#FA1C86" />)
  .add('huge and pink with wider border', () => <Spinner size={64} color="#FA1C86" style={{ borderWidth: '8px' }} />)
  .add('with id', () => <Spinner id="withID" />)

const uF = raw => `(UNFINISHED) ${raw}`

storiesOf(uF('Button'), module)
  .add('default', () => <Button text="UNFINISHED Button" />)

storiesOf(uF('Calendar'), module)
  .add('default', () => <Calendar />)
