import {Component} from 'react'
import {Embed, Flex} from 'rebass'

import Chat from '../components/chat'
import Header from '../components/header'
import Info from '../components/info'
import MainMenu from '../components/main-menu'
import Modal from '../components/modal'
import Twitch from '../components/twitch'
import updateStateKeys from '../functions/update-state-keys'
import {CamerasContext} from '../pages/_app'

export default class extends Component<{}> {
  state = {
    isMainMenuOpen: false,
  }

  render () {
    return <Flex flexDirection='column'>
      <Header />

      <Flex flex='1' flexDirection={['column', 'column', 'row']}>
        <Flex flex={1} flexDirection='column'>
          <CamerasContext.Consumer>
            {({focusedCamera}) => <Embed key={focusedCamera.channel}>
              <Twitch channel={focusedCamera.channel} />
            </Embed>}
          </CamerasContext.Consumer>

          <Flex bg='darkcyan' color='white' flex='1'>
            <Info />
          </Flex>
        </Flex>

        <Flex bg='darkslategray' color='white' flex={[1, 1, '0 0 300px']} flexDirection='column'>
          <Chat room='default' />
        </Flex>

        <Modal isOpen={this.state.isMainMenuOpen} onRequestClose={this.handleMainMenuClose}>
          <MainMenu />
        </Modal>
      </Flex>
    </Flex>
  }

  handleMainMenuOpen = () => this.setState(updateStateKeys({isMainMenuOpen: true}))
  handleMainMenuClose = () => this.setState(updateStateKeys({isMainMenuOpen: false}))
}