import * as React from 'react';
import { Component, Props } from 'react';

import { Typography } from '@material-ui/core';
import { Chat } from '../configManager/chatRelatedTypes';

interface HeaderProps extends Props<{}> {
  chat: Chat;
}

export class Header extends Component<HeaderProps> {
  render () {
    return (
      <div>
        <Typography variant='h2' component='h1'>Flexbot panel</Typography>
      </div>
    );
  }
}