import {Component} from 'react'
import {Box, Button, Heading, Input, Lead} from 'rebass'

import {SocketContext} from '../pages/_app'

interface PropsWithContext {
  socket: SocketIOClient.Socket,
}

class ConfirmVerificationCode extends Component<PropsWithContext> {
  state = {
    inputCode: '',
  }

  render () {
    return <Box>
      <Heading fontSize={3}>Check your inbox for a verification code!</Heading>
      <Lead>Enter it below:</Lead>
      <form onSubmit={this.handleFormSubmit}>
        <Input type='number' placeholder='Your code' onChange={this.handleCodeInputChange} value={this.state.inputCode} />
        <Button type='submit'>Submit</Button>
      </form>
    </Box>
  }

  handleCodeInputChange = e => this.setState({...this.state, inputCode: e.target.value}) 

  handleFormSubmit = e => {
    e.preventDefault()
    this.props.socket.emit('verify code', this.state.inputCode)
  }
}

export default props => <SocketContext.Consumer>
  {socket => <ConfirmVerificationCode {...props} socket={socket} />}
</SocketContext.Consumer>