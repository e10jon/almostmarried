import {Component} from 'react'
import {Box, Button, Heading, Input, Lead} from 'rebass'

import {SocketContext} from '../pages/_app'

interface PropsWithContext {
  socket: SocketIOClient.Socket,
}

class Signup extends Component<PropsWithContext> {
  state = {
    inputEmail: '',
  }

  render () {
    return <Box>
      <Heading fontSize={3}>First, we need to verify an email address of yours.</Heading>
      <Lead>We think it'll make people less likely to say crazy things.</Lead>
      <form onSubmit={this.handleFormSubmit}>
        <Input type='email' placeholder='Your email' onChange={this.handleEmailInputChange} value={this.state.inputEmail} />
        <Button type='submit'>Submit</Button>
      </form>
    </Box>
  }

  handleEmailInputChange = e => this.setState({...this.state, inputEmail: e.target.value}) 

  handleFormSubmit = e => {
    e.preventDefault()
    this.props.socket.emit('verify email', this.state.inputEmail)
  }
}

export default props => <SocketContext.Consumer>
  {socket => <Signup {...props} socket={socket} />}
</SocketContext.Consumer>