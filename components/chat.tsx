import {Component} from 'react'
import {Box, Flex, Input} from 'rebass'
import styled from 'styled-components'

import {SocketContext} from '../pages/_app'

interface Props {
  room: string,
}

interface PropsWithContext extends Props {
  socket: SocketIOClient.Socket,
}

class Chat extends Component<PropsWithContext> {
  state = {
    messages: []
  }

  componentDidMount () {
    // join room
    // listen for messages
  }

  componentWillUnmount () {
    // leave room
  }

  render () {
    return <Wrapper flexDirection='column'>
      <Box flex={1}>
        {this.state.messages.map(message => <Box>
          {message.body}
        </Box>)}
      </Box>
      <Box>
        <Input onKeyPress={this.handleInputKeyPress} placeholder='Send a message...' />
      </Box>
    </Wrapper>
  }

  handleInputKeyPress = e => {
    if (e.key === 'Enter') {
      // send message
    }
  }

  handleMessageReceive = message => this.setState({
    ...this.state, 
    messages: this.state.messages.concat(message)
  })
}

export default (props: Props) => <SocketContext.Consumer>
  {socket => <Chat {...props} socket={socket} />}
</SocketContext.Consumer>

const Wrapper = styled(Flex)`
  height: 100%;
`