import {Component} from 'react'
import {Box, Drawer, Fixed, Heading, Relative} from 'rebass'
import VimeoPlayer from '@vimeo/player'

import Chat from '../components/chat'

export default class extends Component<{}> {
  componentDidMount () {
    this.playVideo()
  }

  render () {
    return <Box>
      <Fixed bg='black' id='video' bottom={0} left={0} right={0} top={0} />
      <Relative>
        <Heading>Sarah and Ethan Lifecast</Heading>

        <Drawer bg='blackTrans' bottom={0} color='white' open right={0} side='right' top={0} width={300}>
          <Chat room='default' />
        </Drawer>
      </Relative>
    </Box>
  }

  private playVideo = () => {
    new VimeoPlayer('video', {
      autoplay: true,
      background: true,
      id: 59777392,
      loop: true,
      playsinline: true,
      responsive: true,
    })
  }
}