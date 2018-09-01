import {Component} from 'react'
import {Box, Button, Heading, Input} from 'rebass'

import {Alert as AlertEntity} from '../entities/alert'
import updateStateKeys from '../functions/update-state-keys'
import {ResponseTypes} from '../typings/response-types'
import {SocketContext} from '../pages/_app'

interface Props {
  alert: AlertEntity,
  closeModal: () => any,
}

interface PropsWithContext extends Props {
  socket: SocketIOClient.Socket,
}

class Alert extends Component<PropsWithContext> {
  render () {
    return <Box>
      <Heading fontSize={3}>{this.props.alert.body}</Heading>

      <Box>
        {(() => {
          switch (this.props.alert.responseType) {
            case ResponseTypes.None:
            return <Button onClick={this.props.closeModal}>Close</Button>

            case ResponseTypes.Boolean:
            return <>
              <Button onClick={this.handleYesResponse}>Yes</Button>
              <Button onClick={this.handleNoResponse}>No</Button>
            </>

            case ResponseTypes.Text:
            return <form onSubmit={this.handleTextFormSubmit}>
              <Input onChange={this.handleTextInputChange} value={this.state.textBody} />
              <Button type='submit'>Submit</Button>
            </form>
          }
        })()}
      </Box>
    </Box>
  }

  handleYesResponse = () => this.submitResponse('1')
  handleNoResponse = () => this.submitResponse('0')
  handleTextResponse = e => this.submitResponse(e.target.value)

  handleTextInputChange = e => this.setState(updateStateKeys({textBody: e.target.value}))
  handleTextFormSubmit = e => {
    e.preventDefault()
    this.submitResponse(this.state.textBody)
  }

  submitResponse = body => {
    this.props.socket.emit('new response', {alertId: this.props.alert.id, body})
    this.props.closeModal()
  }

  state = {
    textBody: '',
  }
}

export default (props: Props) => <SocketContext.Consumer>
  {socket => <Alert {...props} socket={socket} />}
</SocketContext.Consumer>