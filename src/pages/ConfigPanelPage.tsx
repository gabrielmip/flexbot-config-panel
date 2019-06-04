import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";

import { Chat } from '../configManager/chatRelatedTypes';
import { getChatInfo } from "../configManager/configManager";

type ConfigPanelParams = {
  token: string;
};

interface ConfigPanelProps extends
  RouteComponentProps<ConfigPanelParams>, React.Props<ConfigPanelParams> { };

type ConfigPanelState = {
  chat: Chat | null;
}

class ConfigPanelPage extends React.Component<ConfigPanelProps, ConfigPanelState> {
  componentDidMount() {
    getChatInfo(this.props.match.params.token)
      .then((chat) => this.setState({ chat }));
  }

  render() {
    if (this.state !== null) {
      return (
        <div>
          {this.state.chat.trigger_groups.map((group, index) =>
            (<p key={index}>{group.trigger_group_id}</p>))}
          <h1>Oh, hi there! Visitor coming from chat with title {this.state.chat.title}</h1>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

export default ConfigPanelPage;