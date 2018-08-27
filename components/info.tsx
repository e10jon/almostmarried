import {Component} from 'react'
import {BlockLink, Box, Button, Heading, Flex, Input, Text} from 'rebass'
import styled from 'styled-components'

import NewAlert from '../components/new-alert'
import updateStateKeys from '../functions/update-state-keys'
import {UserContext} from '../pages/_app'

enum Tabs {Show, Schedule, About, Alerts}
const TabsMap: Array<[number, string]> = [
  [Tabs.Show, 'Now'],
  [Tabs.Schedule, 'Schedule'],
  [Tabs.About, 'About'],
  [Tabs.Alerts, 'Alerts'],
]
const adminTabs: number[] = [Tabs.Alerts]

interface PropsWithContext {
  user: User,
}

class Info extends Component<PropsWithContext> {
  state = {
    activeTab: Tabs.Show,
  }

  render () {
    return <Flex flex='1' flexDirection='column'>
      <Flex bg='gray'>
        {TabsMap.map(([key, tab]) => {
          if (adminTabs.includes(key) && (!this.props.user || !this.props.user.isAdmin)) return null
          return <Box bg={this.state.activeTab === key ? 'dimgray' : undefined} flex='1' key={key}>
            <BlockLink href='javascript:void(0)' p={1} onClick={this.handleTabClick(key)}>
              <Text textAlign='center'>{tab}</Text>
            </BlockLink>
          </Box>
        })}
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
            case Tabs.Alerts:
              if (!this.props.user || !this.props.user.isAdmin) return null
              return <Box>
                <NewAlert />
              </Box>
          }
        })()}
      </ContentWrapper>
    </Flex>
  }

  handleTabClick = activeTab => e => this.setState(updateStateKeys({activeTab}))
}

export default props => <UserContext.Consumer>
  {user => <Info {...props} user={user} />}
</UserContext.Consumer>

const ContentWrapper = styled(Flex)`
  overflow-y: scroll;
`