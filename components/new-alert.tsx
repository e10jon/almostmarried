import {Component} from 'react'
import {Button, Heading, Input} from 'rebass'

import updateStateKeys from '../functions/update-state-keys'
import {SocketContext} from '../pages/_app'

interface PropsWithContext {
  socket: SocketIOClient.Socket,
}

class NewAlert extends Component<PropsWithContext> {
  state = {
    newAlert: '',
  }

  render () {
    return <form onSubmit={this.handleNewAlertSubmit}>
      <Heading fontSize={3}>Create a new alert</Heading>
      <Input name='message' onChange={this.handleNewAlertChange} value={this.state.newAlert} />
      <Button>Submit</Button>
    </form>
  }

  handleNewAlertChange = e => this.setState(updateStateKeys({newAlert: e.target.value}))

  handleNewAlertSubmit = e => {
    e.preventDefault()
    this.props.socket.emit('new alert', e.target.value)
    this.setState(updateStateKeys({newAlert: ''}))
  }
}

export default props => <SocketContext.Consumer>
  {socket => <NewAlert {...props} socket={socket} />}
</SocketContext.Consumer>
