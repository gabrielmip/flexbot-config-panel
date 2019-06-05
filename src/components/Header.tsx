import * as React from 'react';
import { Component, Props } from 'react';

import { Chat } from '../configManager/chatRelatedTypes';

interface HeaderProps extends Props<{}> {
  chat: Chat;
};

export class Header extends Component<HeaderProps> {
  render () {
    return (
      <div>
        <h1>Flexbot panel</h1>
        <h2>{this.props.chat.title}</h2>
      </div>
    );
  }
}