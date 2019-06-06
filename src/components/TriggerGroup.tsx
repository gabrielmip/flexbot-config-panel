import * as React from 'react';
import { Component } from 'react';

import { Chat, TriggerGroup, Trigger } from '../configManager/chatRelatedTypes';
import { updateTriggerGroup } from '../configManager/configManager';
import { splitTrim } from "../misc";

interface GroupProps {
  triggerGroup: TriggerGroup
};

interface GroupState {
  ignore_case: boolean,
  ignore_repeated_letters: boolean,
  answersInput: string,
  triggersInput: string
}

export class TriggerGroupContainer extends Component<GroupProps, GroupState> {
  constructor (props: GroupProps) {
    super(props);
    const { answers, triggers, ignore_case, ignore_repeated_letters } = props.triggerGroup;
    this.state = {
      ignore_case,
      ignore_repeated_letters,
      answersInput: answers.map(({text}) => text).join('\n'),
      triggersInput: triggers.map(({expression}) => expression).join('\n')
    }
  }

  updateAnswersState (event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ answersInput: event.target.value });
  }

  updateTriggersState (event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ triggersInput: event.target.value });
  }

  updateGroup () {
    const answers = splitTrim(this.state.answersInput);
    const triggers = splitTrim(this.state.triggersInput);
    updateTriggerGroup(this.props.triggerGroup, this.state.ignore_case,
      this.state.ignore_repeated_letters, answers, triggers)
      .then((id) => {
        this.props.triggerGroup.trigger_group_id = id;
      });
  }

  deleteGroup () {
    console.log(this.state);
  }

  invertOption (optionField : string) {
    if (optionField === 'ignore_repeated_letters') {
      this.setState({ ignore_repeated_letters: !this.state.ignore_repeated_letters });
    } else if (optionField === 'ignore_case') {
      this.setState({ ignore_case: !this.state.ignore_case });
    }
  }

  render () {
    return (
      <div>
        <textarea
          value={this.state.triggersInput}
          onChange={this.updateTriggersState} />
        <textarea
          value={this.state.answersInput}
          onChange={this.updateAnswersState} />
        <label htmlFor="ignore_case">Ignorar caixa</label>
        <input
          type="checkbox"
          name="ignore_case"
          defaultChecked={this.props.triggerGroup.ignore_case}
          onChange={() => this.invertOption('ignore_case')} />
        <label htmlFor="ignore_repeated_letters">Ignorar sequências de uma letra</label>
        <input
          name="ignore_repeated_letters"
          type="checkbox"
          defaultChecked={this.props.triggerGroup.ignore_repeated_letters}
          onChange={() => this.invertOption('ignore_repeated_letters')} />
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
