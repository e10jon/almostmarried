import {Component} from 'react'
import {injectGlobal} from 'styled-components'

injectGlobal`
  #twitch-almostmarried > iframe {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    width: 100%; height: 100%;
  }
`

interface Props {
  channel: string,
  divId?: string,
  height?: number,
  width?: number,
}

export default class Vimeo extends Component<Props> {
  componentDidMount () {
    this.play()
  }

  render () {
    return <div id={this.getDivId()} />
  }

  getDivId = () => this.props.divId || `twitch-${this.props.channel}`

  play = () => {
    const player = new window.Twitch.Player(this.getDivId(), {
      width: this.props.width || 560,
      height: this.props.height || 315,
      channel: this.props.channel,
    })
    player.play()
  }
}