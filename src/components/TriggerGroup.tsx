import * as React from 'react';
import { Component } from 'react';

import { TriggerGroup } from '../configManager/chatRelatedTypes';
import { updateTriggerGroup, deleteTriggerGroup } from '../configManager/configManager';
import { splitTrim } from '../utils/misc';

interface GroupProps {
  triggerGroup: TriggerGroup;
}

interface GroupState {
  ignoreCase: boolean;
  ignoreRepeatedLetters: boolean;
  answersInput: string;
  triggersInput: string;
  isVisible: boolean;
}

export class TriggerGroupContainer extends Component<GroupProps, GroupState> {
  constructor (props: GroupProps) {
    super(props);
    const { answers, triggers, ignoreCase, ignoreRepeatedLetters } = props.triggerGroup;
    this.state = {
      isVisible: true,
      ignoreCase,
      ignoreRepeatedLetters,
      answersInput: answers.map(({ text }) => text).join('\n'),
      triggersInput: triggers.map(({ expression }) => expression).join('\n')
    }
  }

  updateAnswersState (event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ answersInput: event.target.value });
  }

  updateTriggersState (event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ triggersInput: event.target.value });
  }

  async updateGroup () {
    const answers = splitTrim(this.state.answersInput);
    const triggers = splitTrim(this.state.triggersInput);

    const groupId = await updateTriggerGroup(
      this.props.triggerGroup.triggerGroupId,
      this.state.ignoreCase,
      this.state.ignoreRepeatedLetters,
      answers,
      triggers
    );

    this.props.triggerGroup.triggerGroupId = groupId;
  }

  deleteGroup () {
    const groupId = this.props.triggerGroup.triggerGroupId;
    const deletionPromise: Promise<boolean> = (groupId)
      ? deleteTriggerGroup(groupId)
      : Promise.resolve(true);

    deletionPromise.then((deleted) => {
      this.setState({ isVisible: !deleted });
    });
  }

  invertOption (optionField: string) {
    if (optionField === 'ignoreRepeatedLetters') {
      this.setState({ ignoreRepeatedLetters: !this.state.ignoreRepeatedLetters });
    } else if (optionField === 'ignoreCase') {
      this.setState({ ignoreCase: !this.state.ignoreCase });
    }
  }

  render () {
    if (!this.state.isVisible) {
      return null;
    }

    return (
      <div>
        <textarea
          value={this.state.triggersInput}
          onChange={this.updateTriggersState} />
        <textarea
          value={this.state.answersInput}
          onChange={this.updateAnswersState} />
        <label htmlFor='ignoreCase'>Ignorar caixa</label>
        <input
          type='checkbox'
          name='ignoreCase'
          defaultChecked={this.props.triggerGroup.ignoreCase}
          onChange={() => this.invertOption('ignoreCase')} />
        <label htmlFor='ignoreRepeatedLetters'>Ignorar sequências de uma letra</label>
        <input
          name='ignoreRepeatedLetters'
          type='checkbox'
          defaultChecked={this.props.triggerGroup.ignoreRepeatedLetters}
          onChange={() => this.invertOption('ignoreRepeatedLetters')} />
        <button
          onClick={() => this.updateGroup()}>
          Atualizar
        </button>
        <button
          onClick={() => this.deleteGroup()}>
          Deletar
        </button>
      </div>
    );
  }
}
