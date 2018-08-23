import {Component} from 'react'
import {Box, Drawer, Fixed, Heading, Relative} from 'rebass'
import VimeoPlayer from '@vimeo/player'

import Chat from '../components/chat'
import Modal from '../components/modal'

export default class extends Component<{}> {
  state = {
    isMainMenuOpen: false,
  }

  componentDidMount () {
    this.playVideo()
  }

  render () {
    return <Box>
      <Fixed bg='black' id='video' bottom={0} left={0} right={0} top={0} />
      <Relative>
        <Heading onClick={this.handleMainMenuOpen}>Sarah and Ethan Lifecast</Heading>

        <Drawer bg='blackTrans' bottom={0} color='white' open right={0} side='right' top={0} width={300}>
          <Chat room='default' />
        </Drawer>
      </Relative>

      <Modal isOpen={this.state.isMainMenuOpen} onRequestClose={this.handleMainMenuClose}>
        main menu
      </Modal>
    </Box>
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