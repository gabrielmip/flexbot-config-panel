import { IOChat, Chat, IOTriggerGroup, TriggerGroup, IOAnswer, Answer, IOTrigger, Trigger } from '../configManager/chatRelatedTypes';

export function camelCasedChat (ioChat: IOChat): Chat {
  return {
    chatId: ioChat.chat_id,
    title: ioChat.title,
    triggerGroups: ioChat.trigger_groups.map(camelCasedGroup)
  };
}

export function camelCasedGroup (ioGroup: IOTriggerGroup): TriggerGroup {
  return {
    triggerGroupId: ioGroup.trigger_group_id,
    chatId: ioGroup.chat_id,
    ignoreCase: ioGroup.ignore_case,
    ignoreRepeatedLetters: ioGroup.ignore_repeated_letters,
    answers: ioGroup.answers.map(camelCasedAnswer),
    triggers: ioGroup.triggers.map(camelCasedTrigger),
  }
}

export function camelCasedAnswer (ioAnswer: IOAnswer): Answer {
  return {
    answerId: ioAnswer.answer_id,
    text: ioAnswer.text,
    triggerGroupId: ioAnswer.trigger_group_id
  };
}

export function camelCasedTrigger (ioTrigger: IOTrigger): Trigger {
  return {
    triggerId: ioTrigger.trigger_id,
    expression: ioTrigger.expression,
    triggerGroupId: ioTrigger.trigger_group_id
  };
}