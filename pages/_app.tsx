import * as cookies from 'js-cookie'
import NextApp, {Container} from 'next/app'
import {createContext} from 'react'
import {Helmet} from 'react-helmet'
import {Provider as ThemeProvider} from 'rebass'
import * as io from 'socket.io-client'
import {injectGlobal} from 'styled-components'

import Modal from '../components/modal'
import Signup from '../components/signup'
import updateStateKeys from '../functions/update-state-keys'

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
    this.signInUserFromCookies()
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
    const token = cookies.get('token') 
    const socket = io({query: {token}})
    this.setState(updateStateKeys({socket}))
  }

  openSignupModal = () => this.setState(updateStateKeys({isSignupModalOpen: true}))
  closeSignupModal = () => this.setState(updateStateKeys({isSignupModalOpen: false}))

  signInUser = user => this.setState(updateStateKeys({user}))

  signInUserFromCookies = () => {
    const user = cookies.getJSON('user')
    if (user) this.signInUser(user)
  }
}

export default App