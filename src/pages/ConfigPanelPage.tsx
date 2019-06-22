import * as React from 'react';
import { Props, Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/styles';

import pageStyles from '../styles/ConfigPanelPage';
import { Chat, TriggerGroup } from '../configManager/chatRelatedTypes';
import { getChatInfo, addTriggerGroup } from '../configManager/configManager';
import { setDefaultAuthorizationHeader } from '../authentication/tokenHandler';
import { Header } from '../components/Header';
import { TriggerGroupContainer } from '../components/TriggerGroup';

interface ConfigPanelParams {
  token: string;
}

interface ConfigPanelProps extends
  RouteComponentProps<ConfigPanelParams>, Props<ConfigPanelParams>, WithStyles<typeof pageStyles> { }

interface ConfigPanelState {
  chat: Chat | null;
  loading: boolean;
  internalError: boolean;
  unauthorizedError: boolean;
}

function setIsEmptyInGroups (groups: TriggerGroup[]): TriggerGroup[] {
  return groups.map((group) => {
    group.isEmpty = (group.answers.length === 0 && group.triggers.length === 0);
    return group;
  });
}

class ConfigPanel extends Component<ConfigPanelProps, ConfigPanelState> {
  token: string;

  constructor (props: ConfigPanelProps) {
    super(props);
    this.token = this.props.match.params.token;
    this.state = {
      loading: true,
      chat: null,
      internalError: false,
      unauthorizedError: false
    };
    setDefaultAuthorizationHeader(this.token);
  }

  componentDidMount () {
    getChatInfo(this.token)
      .then((chat) => {
        chat.triggerGroups = setIsEmptyInGroups(chat.triggerGroups);
        this.setState({
          chat,
          loading: false
        });
      })
      .catch((error) => {
        const baseNewStatus = {
          loading: false,
          unauthorizedError: false,
          internalError: false
        };

        if (error.response.status === 401) {
          this.setState({ ...baseNewStatus, unauthorizedError: true });
        } else {
          this.setState({ ...baseNewStatus, internalError: true });
        }
      });
  }

  listTriggerGroups () {
    const groups = this.state.chat.triggerGroups;
    return groups.map((triggerGroup) => (
      <TriggerGroupContainer
        triggerGroup={triggerGroup}
        updateIsEmpty={(id: number, isEmpty: boolean) => this.updateIsEmpty(id, isEmpty)}
        announceDeletion={(id: number) => this.deleteGroupFromList(id)}
        key={triggerGroup.triggerGroupId} />
    ));
  }

  updateIsEmpty (id: number, isEmpty: boolean) {
    const chat = this.state.chat;
    const index = chat.triggerGroups.findIndex(({triggerGroupId}) => triggerGroupId === id);
    chat.triggerGroups[index].isEmpty = isEmpty;
    this.setState({ chat });
  }

  deleteGroupFromList (id: number) {
    const index = this.state.chat.triggerGroups.findIndex(({triggerGroupId}) => triggerGroupId === id);
    this.state.chat.triggerGroups.splice(index, 1);
    this.setState({ chat: this.state.chat });
  } 

  findIndexOfNewIfExists () {
    return this.state.chat.triggerGroups
      .findIndex(({isEmpty}) => (isEmpty));
  }

  moveGroupToTheTop (index: number) {
    const chat = Object.assign({}, this.state.chat);
    const groupToMove = chat.triggerGroups[index];
    chat.triggerGroups.splice(index, 1);
    chat.triggerGroups.unshift(groupToMove);
    this.setState({ chat });
  }

  addTriggerGroup () {
    const newGroupIndex = this.findIndexOfNewIfExists();
    if (newGroupIndex >= 0) {
      this.moveGroupToTheTop(newGroupIndex);
    } else {
      addTriggerGroup(this.state.chat.chatId)
        .then((newTriggerGroup) => {
          newTriggerGroup.isEmpty = true;
          this.state.chat.triggerGroups.unshift(newTriggerGroup);
          this.setState({ chat: this.state.chat });
        });
    }
  }

  buildPanelBody () {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    if (this.state.internalError) {
      return <Typography color='error'>
        So... something weird happened when I was trying to get your bot&lsquo;s responses.
        Please, try again later.
      </Typography>;
    }

    if (this.state.unauthorizedError) {
      return <Typography color='error'>
        You are not allowed to see this page. It might just be that the link is too old.
        Go to the conversation that this bot is part of on your Telegram app and type /config
        to get an up to date link.
      </Typography>;
    }
    
    return <Box>
      <Button
        variant='contained'
        color='primary'
        onClick={() => this.addTriggerGroup()}>
        New response
      </Button>
      {this.listTriggerGroups()}
    </Box>;
  }

  render () {
    return (
      <Grid className={this.props.classes.container}>
        <Header />
        <Box style={{ marginTop: 30 }}>
          {this.buildPanelBody()}
        </Box>
      </Grid>
    );
  }
}

const ConfigPanelPage = withStyles(pageStyles)(ConfigPanel);
export default ConfigPanelPage;