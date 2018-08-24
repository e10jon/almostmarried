import NextApp, {Container} from 'next/app'
import {createContext} from 'react'
import {Helmet} from 'react-helmet'
import {Provider as ThemeProvider} from 'rebass'
import * as io from 'socket.io-client'
import {injectGlobal} from 'styled-components'

import Modal from '../components/modal'
import Signup from '../components/signup'

export const SignupModalContext = createContext({openSignupModal: null, closeSignupModal: null})
export const SignInUserContext = createContext(null)
export const SocketContext = createContext(null)
export const UserContext = createContext(null)

const theme = {
  colors: {
    blackTrans: 'rgba(0, 0, 0, 0.8)',
  }
}

injectGlobal`
  body { 
    margin: 0;
    padding: 0;
  }
  #__next > div > div {
    min-height: 100vh;
  }
`

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
    isSignupModalOpen: false,
    socket: null,
    user: null,
  }

  componentDidMount () {
    this.connectWebsocket()
  }

  componentWillUnmount () {
    this.state.socket.close()
  }

  render () {
    return <Container>
      <Helmet>
        <title>Almost Married</title>
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <meta property='og:title' content='Almost Married' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='/static/images/sarah-coffee-hand-up.jpg' />
        <meta property='og:url' content='https://almostmarried.tv' />
      </Helmet>

      <SocketContext.Provider value={this.state.socket}>
        <SignInUserContext.Provider value={this.signInUser}>
          <UserContext.Provider value={this.state.user}>
            <SignupModalContext.Provider value={{openSignupModal: this.openSignupModal, closeSignupModal: this.closeSignupModal}}>
              <ThemeProvider theme={theme}>
                <this.props.Component {...this.props.componentProps} />

                <Modal isOpen={this.state.isSignupModalOpen} onRequestClose={this.closeSignupModal}>
                  <Signup />
                </Modal>

                <div id='modal' />
              </ThemeProvider>
            </SignupModalContext.Provider>
          </UserContext.Provider>
        </SignInUserContext.Provider>
      </SocketContext.Provider>
    </Container>
  }

  connectWebsocket = () => {
    this.setState({...this.state, socket: io()})
  }

  openSignupModal = () => this.setState({...this.state, isSignupModalOpen: true})
  closeSignupModal = () => this.setState({...this.state, isSignupModalOpen: false})

  signInUser = user => this.setState({...this.state, user})
}

export default App