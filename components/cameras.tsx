import {Component} from 'react'
import {Link, Box, Flex} from 'rebass'

import Vimeo from '../components/vimeo'
import {CamerasContext} from '../pages/_app'

export default class Cameras extends Component<{}> {
  render () {
    return <CamerasContext.Consumer>
      {({cameras, changeFocusedCamera}) => <Flex>
        {cameras.map(camera => <Box key={camera.id}>
          <Vimeo divId={`vimeo-small-${camera.id}`} id={camera.id} height={100} width={200} />
          <Link href='javascript:void(0)' onClick={changeFocusedCamera(camera)}>change</Link>
        </Box>)}
      </Flex>}
    </CamerasContext.Consumer>
  }
}