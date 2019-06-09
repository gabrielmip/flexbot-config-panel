import * as React from 'react';
import { Props, Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

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
        <div>
          <Header chat={this.state.chat} />
          <div>
            <button onClick={() => this.addTriggerGroup()}>Nova resposta</button>
            {this.listTriggerGroups()}
          </div>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}