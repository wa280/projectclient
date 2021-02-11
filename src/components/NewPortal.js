import React, { Component } from 'react'
import {
  Form,
  Grid,
  Button,
  Header,
  Segment,
  TransitionablePortal,Input,TextArea,Icon
} from 'semantic-ui-react'

const transitions = [
  'browse',
  'browse right',
  'drop',
  'fade',
  'fade up',
  'fade down',
  'fade left',
  'fade right',
  'fly up',
  'fly down',
  'fly left',
  'fly right',
  'horizontal flip',
  'vertical flip',
  'scale',
  'slide up',
  'slide down',
  'slide left',
  'slide right',
  'swing up',
  'swing down',
  'swing left',
  'swing right',
  'zoom',
]
const options = transitions.map((name) => ({
  key: name,
  text: name,
  value: name,
}))

export default class newPortal extends Component {
  state = { animation: transitions[0], duration: 500, open: false }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleClick = () => this.setState((prevState) => ({ open: !prevState.open }))

  render() {
    const { animation, duration, open } = this.state

    return (
      
          <>
            
            <Form.Button
              content={open ? <Icon name='mail' />: <Icon name='mail' />}
              negative={open}
              positive={!open}
              onClick={this.handleClick}
             
            />
          

          <TransitionablePortal
            open={open}
            transition={{ animation, duration }}
          >
            <Segment
              style={{
                left: '40%',
                position: 'fixed',
                top: '20%',
                zIndex: 1000,
              }}
            >
              <Header>send an email</Header>
              <div className ='form-container'>
  <Form>
    <Form.Group widths='equal'>
      <Form.Field
        id='form-input-control-first-name'
        control={Input}
        label='First name'
        placeholder='First name'
      />
      <Form.Field
        id='form-input-control-last-name'
        control={Input}
        label='Last name'
        placeholder='Last name'
      />
      
    </Form.Group>
    <Form.Field
      id='form-textarea-control-opinion'
      control={TextArea}
      label='Opinion'
      placeholder='Opinion'
    />
    <Form.Field
      id='form-input-control-error-email'
      control={Input}
      label='Email'
      placeholder='joe@schmoe.com'
      error={{
        content: 'make sure you enter a valid email address',
        pointing: 'below',
      }}
    />
    
    <Button type ="submit" color="teal">
          
          <Icon name='send'/>
              
         </Button>
         
  </Form>
  </div>
  <Form.Button
              content={open ? 'Exit' : 'Open Portal'}
              negative={open}
              positive={!open}
              onClick={this.handleClick}
              position='right'
              
            /> 
            </Segment>
          </TransitionablePortal>
       </>
    )
  }
}
