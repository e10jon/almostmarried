import Player from '@vimeo/player'
import {Component} from 'react'

interface Props {
  divId?: string,
  height?: number,
  id: number,
  responsive?: boolean,
  width?: number,
}

export default class Vimeo extends Component<Props> {
  componentDidMount () {
    this.play()
  }

  render () {
    return <span id={this.getDivId()} />
  }

  getDivId = () => this.props.divId || `vimeo-${this.props.id}`

  play = () => {
    new Player(this.getDivId(), {
      autoplay: true,
      background: true,
      loop: true,
      playsinline: true,
      ...this.props,
    })
  }
}