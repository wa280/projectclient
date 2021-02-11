import React from 'react'
import { Image, Reveal } from 'semantic-ui-react'

const reveal = () => (
  <Reveal animated='move right'>
    <Reveal.Content visible>
      <Image src='/b.jpg' size='small' />
    </Reveal.Content>
    <Reveal.Content hidden>
      <Image src='/b.jpg' size='small' />
    </Reveal.Content>
  </Reveal>
)

export default reveal
