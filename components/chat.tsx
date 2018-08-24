import {Component} from 'react'
import {Box, Heading, Flex, Input} from 'rebass'
import styled from 'styled-components'

import Modal from '../components/modal'
import Signup from './signup'
import {SocketContext, UserContext} from '../pages/_app'

interface Props {
  room: string,
}

interface PropsWithContext extends Props {
  socket: SocketIOClient.Socket,
  user: User,
}

class Chat extends Component<PropsWithContext> {
  state = {
    isSignupModalOpen: false,
    messages: [],
    newMessage: '',
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.socket && this.props.socket) {
      this.joinRoom()
      this.listenForMessages()
    }
  }

  componentWillUnmount () {
    if (this.props.socket) {
      this.stopListeningForMessages()
      this.leaveRoom()
    }
  }

  render () {
    return <Wrapper flex='1' flexDirection='column'>
      <Box flex={1}>
        <Heading fontSize={2}>Chat messages:</Heading>
        {this.state.messages.map(message => <Box key={message}>
          {message}
        </Box>)}
      </Box>
      <Box>
        <Input 
          onKeyPress={this.handleInputKeyPress} 
          placeholder='Send a message...' 
          value={this.state.newMessage} 
        />
      </Box>

      <Modal isOpen={this.state.isSignupModalOpen} onRequestClose={this.handleSignupModalClose}>
        <Signup />
      </Modal>
    </Wrapper>
  }

  handleInputKeyPress = e => {
    if (e.key === 'Enter') {
      if (!this.props.user) {
        this.handleSignupModalOpen()
      } else {
        this.props.socket.emit('new message', e.target.value)
        this.setState({...this.state, newMessage: ''})
      }
    } else {
      this.setState({...this.state, newMessage: this.state.newMessage + e.key})
    }
  }

  handleSignupModalOpen = () => this.setState({...this.state, isSignupModalOpen: true})
  handleSignupModalClose = () => this.setState({...this.state, isSignupModalOpen: false})

  handleMessageReceive = message => this.setState({...this.state, messages: this.state.messages.concat(message)})

  joinRoom = () => this.props.socket.emit('join room', this.props.room)
  leaveRoom = () => this.props.socket.emit('leave room', this.props.room)
  listenForMessages = () => this.props.socket.on('new message', this.handleMessageReceive)
  stopListeningForMessages = () => this.props.socket.off('new message', this.handleMessageReceive)
}

export default (props: Props) => <SocketContext.Consumer>
  {socket => <UserContext.Consumer>
    {user => <Chat {...props} socket={socket} user={user} />}
  </UserContext.Consumer>}
</SocketContext.Consumer>

const Wrapper = styled(Flex)`
  height: 100%;
`