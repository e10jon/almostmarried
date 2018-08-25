import {Component} from 'react'
import {Box, Heading, Flex, Input} from 'rebass'
import styled from 'styled-components'

import updateStateKeys from '../functions/update-state-keys'
import {SignupModalContext, SocketContext, UserContext} from '../pages/_app'

interface Props {
  room: string,
}

interface PropsWithContext extends Props {
  openSignupModal: () => any,
  socket: SocketIOClient.Socket,
  user: User,
}

class Chat extends Component<PropsWithContext> {
  state = {
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
    this.stopListeningForMessages()
    this.leaveRoom()
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
        {this.props.user && <Box>Signed in as {this.props.user.handle}</Box>}
        <Input 
          onKeyPress={this.handleInputKeyPress} 
          placeholder='Send a message...' 
          value={this.state.newMessage} 
        />
      </Box>
    </Wrapper>
  }

  handleInputKeyPress = e => {
    const {key} = e
    if (key === 'Enter') {
      if (!this.props.user) {
        this.props.openSignupModal()
      } else {
        this.props.socket.emit('new message', e.target.value)
        this.setState(updateStateKeys({newMessage: ''}))
      }
    } else {
      this.setState(updateStateKeys(state => ({newMessage: state.newMessage + key})))
    }
  }

  handleMessageReceive = ({message, user}) => {
    this.setState(updateStateKeys(state => ({messages: state.messages.concat(message)})))
  }

  joinRoom = () => this.props.socket.emit('join room', this.props.room)
  leaveRoom = () => this.props.socket.emit('leave room', this.props.room)
  listenForMessages = () => this.props.socket.on('new message', this.handleMessageReceive)
  stopListeningForMessages = () => this.props.socket.off('new message', this.handleMessageReceive)
}

export default (props: Props) => <SocketContext.Consumer>
  {socket => <UserContext.Consumer>
    {user => <SignupModalContext.Consumer>
      {({openSignupModal}) => <Chat {...props} openSignupModal={openSignupModal} socket={socket} user={user} />}
    </SignupModalContext.Consumer>}
  </UserContext.Consumer>}
</SocketContext.Consumer>

const Wrapper = styled(Flex)`
  height: 100%;
`