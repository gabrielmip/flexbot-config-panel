import * as React from 'react';
import { Component } from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { withStyles, WithStyles, Card, CardContent, Collapse } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from '../styles/TriggerGroup';
import { TriggerGroup } from '../configManager/chatRelatedTypes';
import { updateTriggerGroup, deleteTriggerGroup } from '../configManager/configManager';
import { splitTrim } from '../utils/misc';

interface GroupProps extends WithStyles<typeof styles> {
  triggerGroup: TriggerGroup;
  announceDeletion: (groupId: number) => void;
  updateIsEmpty: (groupId: number, isEmpty: boolean) => void;
}

interface GroupState {
  ignoreCase: boolean;
  ignoreRepeatedLetters: boolean;
  answersInput: string;
  triggersInput: string;
  isVisible: boolean;
  showDeleteButton: boolean;
}

class UndecoratedTriggerGroup extends Component<GroupProps, GroupState> {
  private showActionsDelay = 200;
  private showActionsTimeout = 0;
  private updateDebounce = 0;
  
  constructor (props: GroupProps) {
    super(props);
    const { answers, triggers, ignoreCase, ignoreRepeatedLetters } = props.triggerGroup;
    this.state = {
      isVisible: true,
      ignoreCase,
      showDeleteButton: false,
      ignoreRepeatedLetters,
      answersInput: answers.map(({ text }) => text).join('\n'),
      triggersInput: triggers.map(({ expression }) => expression).join('\n')
    }
  }

  getCardStyle () {
    const paddingAmount = (this.state.showDeleteButton) ? 5 : 20;
    return { paddingBottom: `${paddingAmount}px !important` };
  }

  startActionBoxTimeout () {
    if (this.showActionsTimeout) {
      window.clearTimeout(this.showActionsTimeout);
    }

    this.showActionsTimeout = window.setTimeout(() => {
      this.setState({ showDeleteButton: true });
    }, this.showActionsDelay)
  }

  closeActionBox () {
    if (this.showActionsTimeout) {
      window.clearTimeout(this.showActionsTimeout);
    }
    this.setState({ showDeleteButton: false });
  }

  updateAnswersState (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) {
    const answersInput = event.target.value;
    this.setState({ answersInput });
    this.setUpdateDebounce();
  }

  updateTriggersState (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) {
    const triggersInput = event.target.value;
    this.setState({ triggersInput });
    this.setUpdateDebounce();
  }

  setUpdateDebounce () {
    if (this.updateDebounce) {
      clearTimeout(this.updateDebounce);
    }
    this.updateDebounce = window.setTimeout(() => this.updateGroup(), 400);
  }

  async updateGroup () {
    const answers = splitTrim(this.state.answersInput);
    const triggers = splitTrim(this.state.triggersInput);
    const isEmpty = (answers.length === 0 && triggers.length === 0);

    const groupId = await updateTriggerGroup(
      this.props.triggerGroup.triggerGroupId,
      this.state.ignoreCase,
      this.state.ignoreRepeatedLetters,
      answers,
      triggers
    );

    this.props.triggerGroup.triggerGroupId = groupId;
    this.props.updateIsEmpty(groupId, isEmpty);
  }

  deleteGroup () {
    const groupId = this.props.triggerGroup.triggerGroupId;
    deleteTriggerGroup(groupId)
      .then((deleted) => {
        this.setState({ isVisible: !deleted });
        this.props.announceDeletion(groupId);
      });
  }

  render () {
    if (!this.state.isVisible) {
      return null;
    }

    return (
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => this.startActionBoxTimeout()}
        onMouseLeave={() => this.closeActionBox()}>
        <Card
          className={this.props.classes.triggerGroup}>
          <CardContent
            className={this.props.classes.card}
            style={this.getCardStyle()}>
            <Box display='flex' flexWrap='nowrap'>
              <TextField
                className={this.props.classes.field}
                label='When you say...'
                placeholder=''
                multiline
                rows='3'
                value={this.state.triggersInput}
                onChange={(e) => this.updateTriggersState(e)}
                variant='outlined' />
              <TextField
                className={this.props.classes.field}
                style={{ marginLeft: 15 }}
                label='The bot says...'
                placeholder=''
                multiline
                rows='3'
                value={this.state.answersInput}
                onChange={(e) => this.updateAnswersState(e)}
                variant='outlined' />
            </Box>
          </CardContent>
          <Collapse in={this.state.showDeleteButton}>
            <Button 
              color='secondary'
              className={this.props.classes.actionButtons}
              onClick={() => this.deleteGroup()}>
              <DeleteIcon />
              Delete
            </Button>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export const TriggerGroupContainer = withStyles(styles)(UndecoratedTriggerGroup);