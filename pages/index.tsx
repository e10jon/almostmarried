import {Component} from 'react'
import {Box, Fixed, Heading, Relative} from 'rebass'
import VimeoPlayer from '@vimeo/player'

export default class extends Component<{}> {
  componentDidMount () {
    this.playVideo()
  }

  render () {
    return <Box>
      <Fixed bg='black' id='video' bottom={0} left={0} right={0} top={0} />
      <Relative>
        <Heading>Sarah and Ethan Lifecast</Heading>
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