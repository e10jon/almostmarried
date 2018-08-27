import {Component} from 'react'
import {Box, Input} from 'rebass'

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

class NewChat extends Component<PropsWithContext> {
  state = {
    newChat: '',
  }

  render () {
    return <Box>
      <Input 
        onChange={this.handleInputChange}
        onKeyPress={this.handleInputKeyPress} 
        placeholder='Send a message...' 
        value={this.state.newChat} 
      />
    </Box>
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
}

export default (props: Props) => <SocketContext.Consumer>
  {socket => <UserContext.Consumer>
    {user => <SignupModalContext.Consumer>
      {({openSignupModal}) => <NewChat {...props} openSignupModal={openSignupModal} socket={socket} user={user} />}
    </SignupModalContext.Consumer>}
  </UserContext.Consumer>}
</SocketContext.Consumer>
