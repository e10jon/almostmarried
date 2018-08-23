import {Component} from 'react'
import {Box, Drawer, Fixed, Flex, Heading, Relative} from 'rebass'
import VimeoPlayer from '@vimeo/player'

import Chat from '../components/chat'
import MainMenu from '../components/main-menu'
import Modal from '../components/modal'

export default class extends Component<{}> {
  state = {
    isMainMenuOpen: false,
  }

  componentDidMount () {
    this.playVideo()
  }

  render () {
    return <Flex bg='black' color='white' flexDirection={['column', 'column', 'row']}>
      <Box flex={1}>
        <Heading fontSize={3}>Sarah❤Ethan</Heading>
        <div id='video' />
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

  playVideo = () => {
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