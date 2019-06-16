import * as React from 'react';
import { Props, Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Box, Button } from '@material-ui/core';

import { Chat } from '../configManager/chatRelatedTypes';
import { getChatInfo, addTriggerGroup } from '../configManager/configManager';
import { setDefaultAuthorizationHeader } from '../authentication/tokenHandler';
import { Header } from '../components/Header';
import { TriggerGroupContainer } from '../components/TriggerGroup';

interface ConfigPanelParams {
  token: string;
}

interface ConfigPanelProps extends
  RouteComponentProps<ConfigPanelParams>, Props<ConfigPanelParams> { }

interface ConfigPanelState {
  chat: Chat | null;
}

export default class ConfigPanelPage extends Component<ConfigPanelProps, ConfigPanelState> {
  token: string;

  constructor (props: ConfigPanelProps) {
    super(props);
    this.token = this.props.match.params.token;
    setDefaultAuthorizationHeader(this.token);
  }

  componentDidMount () {
    getChatInfo(this.token)
      .then((chat) => this.setState({ chat }));
  }

  listTriggerGroups () {
    const groups = this.state.chat.triggerGroups;
    return groups
      .sort((left, right) => right.triggerGroupId - left.triggerGroupId)
      .map((triggerGroup) => (
        <TriggerGroupContainer triggerGroup={triggerGroup} key={triggerGroup.triggerGroupId}/>
      ));
  }

  addTriggerGroup () {
    addTriggerGroup(this.state.chat.chatId)
      .then((newTriggerGroup) => {
        this.state.chat.triggerGroups.unshift(newTriggerGroup);
        this.setState({ chat: this.state.chat });
      });
  }

  render () {
    if (this.state !== null) {
      return (
        <Container maxWidth='md'>
          <Header chat={this.state.chat} />
          <Box style={{marginTop: 50}}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => this.addTriggerGroup()}>
              Novo
            </Button>
            {this.listTriggerGroups()}
          </Box>
        </Container>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}