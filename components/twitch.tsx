import {Component} from 'react'
import {Helmet} from 'react-helmet'
import {Embed} from 'rebass'
import styled from 'styled-components'

interface Props {
  channel: string,
  divId?: string,
  height?: number,
  muted?: boolean,
  width?: number,
}

export default class Vimeo extends Component<Props> {
  componentDidMount () {
    this.play()
  }

  render () {
    return <>
      <Embed>
        <Responsive id={this.getDivId()} />
      </Embed>
      <Helmet>
        <script src='https://player.twitch.tv/js/embed/v1.js' />
      </Helmet>
    </>
  }

  getDivId = () => this.props.divId || `twitch-${this.props.channel}`

  play = () => {
    const player = new window.Twitch.Player(this.getDivId(), {
      width: this.props.width || 560,
      height: this.props.height || 315,
      channel: this.props.channel,
    })
    player.setVolume(this.props.muted ? 0 : 1)
    player.play()
  }
}

const Responsive = styled('div')`
  iframe {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    width: 100%; height: 100%;
  }
`