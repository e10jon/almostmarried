import {Component} from 'react'
import {BlockLink, Box, Heading, Flex, Text} from 'rebass'
import styled from 'styled-components'

import updateStateKeys from '../functions/update-state-keys'

enum Tabs {Show, Schedule, About}
const TabsMap = [
  [Tabs.Show, 'Now'],
  [Tabs.Schedule, 'Schedule'],
  [Tabs.About, 'About']
]

export default class Info extends Component<{}> {
  state = {
    activeTab: Tabs.Show,
  }

  render () {
    return <Flex flex='1' flexDirection='column'>
      <Flex bg='gray'>
        {TabsMap.map(([key, tab]) => <Box bg={this.state.activeTab === key ? 'dimgray' : undefined} flex='1' key={key}>
          <BlockLink href='javascript:void(0)' p={1} onClick={this.handleTabClick(key)}>
            <Text textAlign='center'>{tab}</Text>
          </BlockLink>
        </Box>)}
      </Flex>

      <ContentWrapper bg='darkorange' flex='1' p={1}>
        {(() => {
          switch (this.state.activeTab) {
            case Tabs.Show:
              return <Box>
                <Heading fontSize={3}>Now</Heading>
                <Text>Info about the segment currently on-air</Text>
              </Box>
            case Tabs.Schedule:
              return <Box>
                <Heading fontSize={3}>Schedule</Heading>
                <Text>Our planned list of segments for the week</Text>
              </Box>
            case Tabs.About:
              return <Box>
                <Heading fontSize={3}>About</Heading>
                <Text>Profiles of Sarah, Ethan, and Miss Business</Text>
              </Box>
          }
        })()}
      </ContentWrapper>
    </Flex>
  }

  handleTabClick = activeTab => e => this.setState(updateStateKeys({activeTab}))
}

const ContentWrapper = styled(Flex)`
  overflow-y: scroll;
`