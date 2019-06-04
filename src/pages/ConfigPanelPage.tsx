import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";

type ConfigPanelParams = {
  token: string;
};

interface ConfigPanelProps extends RouteComponentProps<ConfigPanelParams>, React.Props<ConfigPanelParams> {

};

type ConfigPanelState = {

};

class ConfigPanelPage extends React.Component<ConfigPanelProps, ConfigPanelState> {
  render () {
    return (
      <h1>Oh, hi there! {this.props.match.params.token}</h1>
    );
  }
} 

export default ConfigPanelPage;