import {Component} from 'react'
import {Box, Button, Heading, Input, Lead} from 'rebass'

class Signup extends Component<{}> {
  render () {
    return <Box>
      <Heading fontSize={3}>First, we need to verify an email address of yours.</Heading>
      <Lead>We think it'll make people less likely to say crazy things.</Lead>
      <form onSubmit={this.handleFormSubmit}>
        <Input type='email' placeholder='Your email' />
        <Button type='submit'>Submit</Button>
      </form>
    </Box>
  }

  handleFormSubmit = () => {
    // send request to server
  }
}

export default Signup