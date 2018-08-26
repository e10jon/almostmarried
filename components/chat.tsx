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
    chats: [],
    newChat: '',
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
        {this.state.chats.map(chat => <Box key={chat.id}>
          <strong>{chat.user.handle}: </strong>
          {chat.body}
        </Box>)}
      </Box>
      <Box>
        <Input 
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKeyPress} 
          placeholder='Send a message...' 
          value={this.state.newChat} 
        />
      </Box>
    </Wrapper>
  }

  handleInputChange = e => this.setState(updateStateKeys({newChat: e.target.value}))

  handleInputKeyPress = e => {
    if (e.key === 'Enter') {
      if (!this.props.user) {
        this.props.openSignupModal()
      } else {
        this.props.socket.emit('new chat', e.target.value)
        this.setState(updateStateKeys({newChat: ''}))
      }
    }
  }

  handleChatReceive = chat => {
    this.setState(updateStateKeys(state => ({chats: state.chats.concat(chat)})))
  }

  joinRoom = () => this.props.socket.emit('join room', this.props.room)
  leaveRoom = () => this.props.socket.emit('leave room', this.props.room)
  listenForMessages = () => this.props.socket.on('new chat', this.handleChatReceive)
  stopListeningForMessages = () => this.props.socket.off('new chat', this.handleChatReceive)
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