import {Component} from 'react'
import {Button, Heading, Input, Label, Select} from 'rebass'

import {ResponseTypes} from '../typings/response-types'
import updateStateKeys from '../functions/update-state-keys'
import {SocketContext} from '../pages/_app'

interface PropsWithContext {
  socket: SocketIOClient.Socket,
}

class NewAlert extends Component<PropsWithContext> {
  state = {
    body: '',
    responseType: ResponseTypes.None,
  }

  render () {
    return <form onSubmit={this.handleSubmit}>
      <Heading fontSize={3}>Create a new alert</Heading>

      <Label htmlFor='new-alert-response-type'>Response type</Label>
      <Select id='new-alert-response-type' onChange={this.handleResponseTypeChange} value={this.state.responseType}>
        {Object.keys(ResponseTypes).map(responseType => <option key={responseType}>{responseType}</option>)}
      </Select>
        
      <Label htmlFor='new-alert-body'>Body</Label>
      <Input id='new-alert-body' name='message' onChange={this.handleBodyChange} value={this.state.body} />

      <Button>Submit</Button>
    </form>
  }

  handleBodyChange = e => this.setState(updateStateKeys({body: e.target.value}))
  handleResponseTypeChange = e => this.setState(updateStateKeys({responseType: e.target.value}))

  handleSubmit = e => {
    e.preventDefault()
    this.props.socket.emit('new alert', this.state)
    this.setState(updateStateKeys({body: '', responseType: ResponseTypes.None}))
  }
}

export default props => <SocketContext.Consumer>
  {socket => <NewAlert {...props} socket={socket} />}
</SocketContext.Consumer>
