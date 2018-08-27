import {createRef, Component} from 'react'
import {Box, Flex, Input, Small} from 'rebass'
import styled from 'styled-components'

import NewChat from '../components/new-chat'
import updateStateKeys from '../functions/update-state-keys'
import {SocketContext} from '../pages/_app'

interface Props {
  room: string,
}

interface PropsWithContext extends Props {
  socket: SocketIOClient.Socket,
}

class Chat extends Component<PropsWithContext> {
  chatsWrapperRef = createRef<HTMLDivElement>()

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
      <Flex flex={1} flexDirection='column'>
        <ChatsWrapper flex='1' innerRef={this.chatsWrapperRef} p={1}>
          {this.state.chats.map(chat => <Box key={chat.id}>
            <Small><strong>{chat.user.handle}: </strong>{chat.body}</Small>
          </Box>)}
        </ChatsWrapper>
      </Flex>
      <NewChat room={this.props.room} />
    </Wrapper>
  }

  handleChatReceive = chat => {
    this.setState(updateStateKeys(state => ({chats: state.chats.concat(chat)})))
    this.scrollToBottomOfChats()
  }

  handleJoinedRoom = chats => {
    this.setState(updateStateKeys({chats}))
    this.scrollToBottomOfChats()
  }

  joinRoom = () => this.props.socket.emit('join room', this.props.room)
  leaveRoom = () => this.props.socket.emit('leave room', this.props.room)
  listenForMessages = () => {
    this.props.socket.on('new chat', this.handleChatReceive)
    this.props.socket.on('joined room', this.handleJoinedRoom)
  }
  stopListeningForMessages = () => {
    this.props.socket.off('new chat', this.handleChatReceive)
    this.props.socket.off('joined room', this.handleJoinedRoom)
  }

  scrollToBottomOfChats = () => this.chatsWrapperRef.current.scrollTop = this.chatsWrapperRef.current.scrollHeight
}

export default (props: Props) => <SocketContext.Consumer>
  {socket => <Chat {...props} socket={socket} />}
</SocketContext.Consumer>

const Wrapper = styled(Flex)`
  height: 100%;
`

const ChatsWrapper = styled(Box)`
  overflow-y: scroll;
`