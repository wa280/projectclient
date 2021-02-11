import React, { Component } from 'react'
import { Button, Form, Header, Segment, Portal } from 'semantic-ui-react'
import Reveal from './Review'

export default class rightPortal extends Component {
  state = { open: false }

  handleClose = () => this.setState({ open: false })
  handleOpen = () => this.setState({ open: true })

  render() {
    const { open } = this.state

    return (
      <>
          <Form.Button
            content='Right Wing'
            disabled={open}
            positive
            onClick={this.handleOpen}
          />

          <Portal  open={open}>
            <Segment
              style={{
                right: '0.5%',
                position: 'fixed',
                top: '10%',
                zIndex: 1000,
                height:1000
              }}
            > <Reveal/>
              <Header>This is a controlled portal</Header>
              <p>DEVELOPE ME PLIZ</p>
              <p>COMPONENT UNDER COSTRUCTION</p>
              
              <Button
                content='Close Right Wing'
                negative
                onClick={this.handleClose}
              />
            </Segment>
          </Portal>
        </>
    )
  }
}
