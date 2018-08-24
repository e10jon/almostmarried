import {Component} from 'react'
import {Box, Circle, Flex, Heading} from 'rebass'

import {SocketContext} from '../pages/_app'

interface PropsWithContext {
  socket: SocketIOClient.Socket,
}

class Header extends Component<PropsWithContext> {
  state = {
    numConnectedUsers: 0,
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.socket && this.props.socket) {
      this.listenForConnectedUsersUpdates()
    }
  }

  componentWillUnmount () {
    if (this.props.socket) {
      this.stopListeningForConnectedUsersUpdates()
    }
  }

  render () {
    return <Flex alignItems='center' bg='indigo' color='white' p={1}>
      <Heading fontSize={3}>Almost Married</Heading>
      <Circle bg='red' p={0} size={16} />
      <Box>
        {this.state.numConnectedUsers} watching
      </Box>
    </Flex>
  }

  handleNumConnectedUsersMessage = numConnectedUsers => this.setState({...this.state, numConnectedUsers})

  listenForConnectedUsersUpdates = () => this.props.socket.on('num connected users', this.handleNumConnectedUsersMessage)
  stopListeningForConnectedUsersUpdates = () => this.props.socket.off('num connected users', this.handleNumConnectedUsersMessage)
}

export default props => <SocketContext.Consumer>
  {socket => <Header {...props} socket={socket} />}
</SocketContext.Consumer>