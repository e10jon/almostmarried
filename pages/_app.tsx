import NextApp, {Container} from 'next/app'
import {createContext} from 'react'
import {Provider as ThemeProvider} from 'rebass'
import * as io from 'socket.io-client'

export const SocketContext = createContext(null)

export const UserContext = createContext(null)

const theme = {
  colors: {
    blackTrans: 'rgba(0, 0, 0, 0.8)',
  }
}

interface Props {
  componentProps: any,
}

class App extends NextApp<Props> {
  static async getInitialProps ({Component, ctx}) {
    return {
      componentProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
    }
  }

  state = {
    socket: null,
    user: null,
  }

  componentDidMount () {
    this.setState({...this.state, socket: io()})
  }

  componentWillUnmount () {
    this.state.socket.close()
  }

  render () {
    return <Container>
      <SocketContext.Provider value={this.state.socket}>
        <UserContext.Provider value={this.state.user}>
          <ThemeProvider theme={theme}>
            <this.props.Component {...this.props.componentProps} />
          </ThemeProvider>
        </UserContext.Provider>
      </SocketContext.Provider>
    </Container>
  }
}

export default App