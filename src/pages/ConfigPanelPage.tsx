import * as React from 'react';
import { Props, Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Chat } from '../configManager/chatRelatedTypes';
import { getChatInfo, addTriggerGroup, updateTriggerGroup } from '../configManager/configManager';
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
    const groups = this.state.chat.trigger_groups;
    return groups
      .sort((left, right) => right.trigger_group_id - left.trigger_group_id)
      .map((triggerGroup) => (
        <TriggerGroupContainer triggerGroup={triggerGroup} key={triggerGroup.trigger_group_id}/>
      ));
  }

  addTriggerGroup () {
    addTriggerGroup(this.state.chat.chat_id)
      .then((newTriggerGroup) => {
        this.state.chat.trigger_groups.unshift(newTriggerGroup);
        this.setState({ chat: this.state.chat });
      });
  }

  render() {
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