import {Component} from 'react'
import {Box, Flex, Heading} from 'rebass'
import VimeoPlayer from '@vimeo/player'

import Chat from '../components/chat'
import MainMenu from '../components/main-menu'
import Modal from '../components/modal'

export default class extends Component<{}> {
  state = {
    isMainMenuOpen: false,
    mainVideoStream: {id: 59777392},
    videoStreamPreviews: [
      {id: 103893865},
      {id: 45319414},
    ],
  }

  componentDidMount () {
    this.playMainVideo()
    this.playPreviewVideos()
  }

  render () {
    return <Flex bg='black' color='white' flexDirection={['column', 'column', 'row']}>
      <Box flex={1}>
        <Heading fontSize={3}>Sarah❤Ethan</Heading>
        <div id='main-video' />
        <Flex>
          {this.state.videoStreamPreviews.map(videoStream => <Box key={videoStream.id}>
            <div id={`video-stream-preview-${videoStream.id}`} />
          </Box>)}
        </Flex>
      </Box>

      <Box flex={[1, 1, '0 0 300px']}>
        <Chat room='default' />
      </Box>

      <Modal isOpen={this.state.isMainMenuOpen} onRequestClose={this.handleMainMenuClose}>
        <MainMenu />
      </Modal>
    </Flex>
  }

  handleMainMenuOpen = () => this.setState({...this.state, isMainMenuOpen: true})
  handleMainMenuClose = () => this.setState({...this.state, isMainMenuOpen: false})

  playMainVideo = () => {
    new VimeoPlayer('main-video', {
      autoplay: true,
      background: true,
      id: this.state.mainVideoStream.id,
      loop: true,
      playsinline: true,
      responsive: true,
    })
  }

  playPreviewVideos = () => {
    this.state.videoStreamPreviews.forEach(videoStream => {
      new VimeoPlayer(`video-stream-preview-${videoStream.id}`, {
        autoplay: true,
        background: true,
        id: videoStream.id,
        loop: true,
        muted: true,
        playsinline: true,
        width: '200px',
      })
    })
  }
}