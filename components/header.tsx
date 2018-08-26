import {Component} from 'react'
import {Box, Circle, Flex, Heading, Link} from 'rebass'

import updateStateKeys from '../functions/update-state-keys'
import {SocketContext, UserContext, UserAuthContext} from '../pages/_app'

interface PropsWithContext {
  signOut: () => any,
  socket: SocketIOClient.Socket,
  user: User,
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
    return <Flex bg='indigo' color='white' p={1}>
      <Flex alignItems='center' flex='1'>
        <Heading fontSize={3} lineHeight='1'>Almost Married</Heading>
        <Circle bg='red' p={0} size={16} />
        <Box>{this.state.numConnectedUsers}</Box>
      </Flex>
      <Flex>
        {this.props.user && <>
          <Box>Signed in as {this.props.user.handle}</Box>
          <Link href='javascript:void(0)' onClick={this.props.signOut}>Sign out</Link>
        </>}
      </Flex>
    </Flex>
  }

  handleNumConnectedUsersMessage = numConnectedUsers => this.setState(updateStateKeys({numConnectedUsers}))

  listenForConnectedUsersUpdates = () => this.props.socket.on('num connected users', this.handleNumConnectedUsersMessage)
  stopListeningForConnectedUsersUpdates = () => this.props.socket.off('num connected users', this.handleNumConnectedUsersMessage)
}

export default props => <SocketContext.Consumer>
  {socket => <UserContext.Consumer>
    {user => <UserAuthContext.Consumer>
      {({signOut}) => <Header {...props} signOut={signOut} socket={socket} user={user} />}
    </UserAuthContext.Consumer>}
  </UserContext.Consumer>}
</SocketContext.Consumer>