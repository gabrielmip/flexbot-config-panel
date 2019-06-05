import * as React from 'react';
import { Props, Component } from 'react';
import { RouteComponentProps } from "react-router-dom";

import { Chat } from '../configManager/chatRelatedTypes';
import { getChatInfo } from "../configManager/configManager";

import { Header } from "../components/Header";
import { TriggerGroupContainer } from "../components/TriggerGroup";

type ConfigPanelParams = {
  token: string;
};

interface ConfigPanelProps extends
  RouteComponentProps<ConfigPanelParams>, Props<ConfigPanelParams> { };

type ConfigPanelState = {
  chat: Chat | null;
}

export default class ConfigPanelPage extends Component<ConfigPanelProps, ConfigPanelState> {
  componentDidMount () {
    getChatInfo(this.props.match.params.token)
      .then((chat) => this.setState({ chat }));
  }

  listTriggerGroups () {
    return this.state.chat.trigger_groups.map((triggerGroup) => (
      <TriggerGroupContainer triggerGroup={triggerGroup} key={triggerGroup.trigger_group_id}/>
    ));
  }

  render() {
    if (this.state !== null) {
      return (
        <div>
          <Header chat={this.state.chat} />
          <div>
            {this.listTriggerGroups()}
          </div>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}