import {Component} from 'react'
import {Link, Box, Flex} from 'rebass'

import YouTube from '../components/youtube'
import {CamerasContext} from '../pages/_app'

export default class Cameras extends Component<{}> {
  render () {
    return <CamerasContext.Consumer>
      {({cameras, changeFocusedCamera}) => <Flex>
        {cameras.map(camera => <Box key={camera.id}>
          <YouTube id={camera.id} height={100} src={camera.src} width={200} />
          <Link href='javascript:void(0)' onClick={changeFocusedCamera(camera)}>change</Link>
        </Box>)}
      </Flex>}
    </CamerasContext.Consumer>
  }
}