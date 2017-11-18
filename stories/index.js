import React from 'react'

import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import Spinner from '../src/components/react/Indicator'
import Button from '../src/components/react/Button/index'
import Swipe from '../src/components/react/Swiper'
import Calendar from '../src/components/react/Calendar/index'
import LazyBlurImage from '../src/components/react/LazyBlurImage'

storiesOf('Indicator/Default(Spinner)', module)
  .add('default', () => <Spinner />)
  .add('huge and pink', () => <Spinner size="64" color="#FA1C86" />)
  .add('huge and pink with wider border', () => <Spinner size={64} color="#FA1C86" style={{ borderWidth: '8px' }} />)
  .add('with id', () => <Spinner id="withID" />)

const uF = raw => `(UNFINISHED) ${raw}`

storiesOf(uF('Button'), module)
  .add('default', () => <Button text="UNFINISHED Button" />)

storiesOf(uF('Swipe'), module)
  .add('default', () => <Swipe />)

storiesOf(uF('Calendar'), module)
  .add('default', () => <Calendar />)

storiesOf(uF('LazyBlurImage'), module)
  .add('default', () =>
    (<LazyBlurImage
      thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
      source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
      alt="hehe"
      thumbAlt="hehe"
    />)
  )
  .add('two', () =>
    (
      <div>
        <LazyBlurImage
          thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
          source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
          alt="hehe"
          thumbAlt="hehe"
        />
        <LazyBlurImage
          thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
          source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
          alt="hehe"
          thumbAlt="hehe"
        />
      </div>
    )
  )
  .add('two with scroll bar', () =>
    (
      <div style={{ height: '300px', overflow: 'scroll' }}>
        <h1>Scroll To See Lazy Load!</h1>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <LazyBlurImage
          thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
          source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
          alt="hehe"
          thumbAlt="hehe"
          lazy
        />
      </div>
    )
  )
  .add('with blur shadow', () =>
    (
      <LazyBlurImage
        thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
        source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
        alt="hehe"
        thumbAlt="hehe"
        lazy
        withBlurShadow
      />
    )
  )
  .add('with 20% width', () =>
    (
      <LazyBlurImage
        thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
        source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
        alt="hehe"
        thumbAlt="hehe"
        width="20%"
        lazy
        withBlurShadow
      />
    )
  )
  .add('with 50% height', () =>
    (
      <div style={{ height: '100px' }}>
        <LazyBlurImage
          thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
          source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
          alt="hehe"
          thumbAlt="hehe"
          height="50%"
          lazy
          withBlurShadow
        />
      </div>
    )
  )
  .add('with 100px height and 100px width', () =>
    (
      <LazyBlurImage
        thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
        source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
        alt="hehe"
        thumbAlt="hehe"
        width="100px"
        height="100px"
        lazy
        withBlurShadow
      />
    )
  )
  .add('work with flexbox', () =>
    (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <LazyBlurImage
            thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
            source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
            alt="hehe"
            thumbAlt="hehe"
            lazy
            withBlurShadow
            height="100px"
            style={{ flexShrink: 0 }}
          />
          <div style={{ flexGrow: 1, backgroundColor: '#eeeeee' }} />
        </div>
        <h2>Bug!</h2>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img src="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg" alt="hehe" style={{ flexShrink: 0, height: '100px' }} />
          <div style={{ flexGrow: 1, backgroundColor: '#eeeeee' }} />
        </div>
      </div>
    )
  )

