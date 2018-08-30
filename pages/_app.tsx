import * as cookies from 'js-cookie'
import NextApp, {Container} from 'next/app'
import {createContext} from 'react'
import {Helmet} from 'react-helmet'
import {Provider as ThemeProvider} from 'rebass'
import * as io from 'socket.io-client'
import {injectGlobal} from 'styled-components'

import Alert from '../components/alert'
import Modal from '../components/modal'
import Signup from '../components/signup'
import updateStateKeys from '../functions/update-state-keys'

const CAMERAS = [{id: 59777392}, {id: 148243034}]

export const CamerasContext = createContext({cameras: CAMERAS, focusedCamera: CAMERAS[0], changeFocusedCamera: camera => null})
export const SignupModalContext = createContext({openSignupModal: null, closeSignupModal: null})
export const SocketContext = createContext(null)
export const UserAuthContext = createContext({signIn: null, signOut: null})
export const UserContext = createContext(null)

const theme = {
  colors: {
    blackTrans: 'rgba(0, 0, 0, 0.8)',
  }
}

injectGlobal`
  html { height: 100%; }
  body { 
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #__next, #__next > div, #__next > div > div {
    height: 100%;
    overflow: hidden;
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

  componentDidMount () {
    this.reconnectWebsocket()
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
        <UserAuthContext.Provider value={{signIn: this.signInUser, signOut: this.signOutUser}}>
          <UserContext.Provider value={this.state.user}>
            <SignupModalContext.Provider value={{openSignupModal: this.openSignupModal, closeSignupModal: this.closeSignupModal}}>
              <CamerasContext.Provider value={{cameras: CAMERAS, focusedCamera: this.state.focusedCamera, changeFocusedCamera: this.changeFocusedCamera}}>
                <ThemeProvider theme={theme}>
                  <this.props.Component {...this.props.componentProps} />

                  <Modal isOpen={this.state.isSignupModalOpen} onRequestClose={this.closeSignupModal}>
                    <Signup />
                  </Modal>

                  <Modal isOpen={this.state.isAlertOpen} onRequestClose={this.handleAlertClose}>
                    <Alert alert={this.state.alert} />
                  </Modal>

                  <div id='modal' />
                </ThemeProvider>
              </CamerasContext.Provider>
            </SignupModalContext.Provider>
          </UserContext.Provider>
        </UserAuthContext.Provider>
      </SocketContext.Provider>
    </Container>
  }

  reconnectWebsocket = () => {
    if (this.state.socket) {
      this.state.socket.disconnect()
      this.setState(updateStateKeys({socket: null}))
    }
    const token = cookies.get('token')
    const query = token ? {token} : null
    const socket = io({query})
    this.setState(updateStateKeys({socket}))
    socket.on('new alert', this.handleNewAlert)
  }

  openSignupModal = () => this.setState(updateStateKeys({isSignupModalOpen: true}))
  closeSignupModal = () => this.setState(updateStateKeys({isSignupModalOpen: false}))

  signInUser = ({token, user}) => {
    const expires = 30
    cookies.set('token', token, {expires})
    cookies.set('user', user, {expires})
    this.setState(updateStateKeys({user}))
    this.reconnectWebsocket()
    if (window.gtag) window.gtag('set', {user_id: user.id})
  }
  signOutUser = () => {
    cookies.remove('token')
    cookies.remove('user')
    this.setState(updateStateKeys({user: null}))
    this.reconnectWebsocket()
    if (window.gtag) window.gtag('set', {user_id: null})
  }

  signInUserFromCookies = () => {
    const user = cookies.getJSON('user')
    if (user) this.setState(updateStateKeys({user}))
  }

  handleAlertClose = () => this.setState(updateStateKeys({isAlertOpen: false}))
  handleNewAlert = alert => this.setState(updateStateKeys({alert, isAlertOpen: true}))

  changeFocusedCamera = focusedCamera => () => {
    console.log(focusedCamera)
    this.setState(updateStateKeys({focusedCamera}))
  }

  state = {
    alert: null,
    focusedCamera: CAMERAS[0],
    isAlertOpen: false,
    isSignupModalOpen: false,
    socket: null,
    user: null,
  }
}

export default App