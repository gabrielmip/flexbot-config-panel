import * as React from 'react';
import { Component, Props } from 'react';
import { Typography } from '@material-ui/core';


export class Header extends Component<Props<{}>> {
  render () {
    return (
      <div>
        <Typography variant='h1' style={{lineHeight: 1.8}}>
          Flexbot panel
        </Typography>
        <Typography style={{lineHeight: 1.8}}>
          Welcome to the settings of your Flexbot!
          <br />
          Press the button below to start playing.
          You can set multiple triggers and responses entering them in separate lines.
        </Typography>
      </div>
    );
  }
}