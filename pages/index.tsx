import {Component} from 'react'
import {Box, Flex, Heading} from 'rebass'
import VimeoPlayer from '@vimeo/player'

import Chat from '../components/chat'
import Header from '../components/header'
import MainMenu from '../components/main-menu'
import Modal from '../components/modal'

export default class extends Component<{}> {
  state = {
    isMainMenuOpen: false,
    mainVideoStream: {id: 59777392},
  }

  componentDidMount () {
    this.playMainVideo()
  }

  render () {
    return <Flex flexDirection='column'>
      <Header />

      <Flex flex='1' flexDirection={['column', 'column', 'row']}>
        <Flex flex={1} flexDirection='column'>
          <div id='main-video' />

          <Box bg='darkcyan' color='white' flex='1'>
            tabs will go here like schedule, about, comments
          </Box>
        </Flex>

        <Box bg='darkolivegreen' color='white' flex={[1, 1, '0 0 300px']}>
          <Chat room='default' />
        </Box>

        <Modal isOpen={this.state.isMainMenuOpen} onRequestClose={this.handleMainMenuClose}>
          <MainMenu />
        </Modal>
      </Flex>
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
}