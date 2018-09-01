import {Component} from 'react'
import {BlockLink, Box, Flex, Text} from 'rebass'

import Twitch from '../components/twitch'
import {CamerasContext} from '../pages/_app'

export default class Cameras extends Component<{}> {
  render () {
    return <CamerasContext.Consumer>
      {({cameras, changeFocusedCamera}) => <Flex flex='1' flexWrap='wrap'>
        {cameras.map(camera => <Box key={camera.channel} width={1 / 3}>
          <Twitch channel={camera.channel} height={100} muted quality='160p30' width={200} />
          <BlockLink bg='red' href='javascript:void(0)' onClick={changeFocusedCamera(camera)}>
            <Text textAlign='center'>
              Focus
            </Text>
          </BlockLink>
        </Box>)}
      </Flex>}
    </CamerasContext.Consumer>
  }
}