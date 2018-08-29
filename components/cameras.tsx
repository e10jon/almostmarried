import {Component} from 'react'
import {Box} from 'rebass'

import Vimeo from '../components/vimeo'

const cameras = [{id: 213575745}]

export default class Cameras extends Component<{}> {
  render () {
    return <Box>
      {cameras.map(camera => <Vimeo id={camera.id} key={camera.id} height={100} width={200} />)}
    </Box>
  }
}