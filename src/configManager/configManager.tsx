import axios from 'axios';

import urls from '../../config/urls';
import { ID, Chat, TriggerGroup } from './chatRelatedTypes';
import { camelCasedChat } from '../utils/ioTransforms';

export async function getChatInfo (token: string): Promise<Chat> {
  const url = `${urls.config}/${token}`;
  const { data: chat } = await axios.get(url);
  return camelCasedChat(chat);
}

export async function deleteTriggerGroup (id: ID): Promise<boolean> {
  const url = `${urls.config}/trigger_groups/${id}`;
  const {data: {deleted}} = await axios.delete(url);
  return deleted;
}

export async function addTriggerGroup (chatId: ID) {
  const group: TriggerGroup = {
    chatId,
    ignoreCase: true,
    ignoreRepeatedLetters: true,
    answers: [],
    triggers: []
  };

  const triggerGroupId = await updateTriggerGroup(
    null,
    group.ignoreCase,
    group.ignoreRepeatedLetters,
    [],
    []
  );
  
  return { ...group, triggerGroupId };
}

export async function updateTriggerGroup (
  triggerGroupId: ID | null,
  ignoreCase: boolean,
  ignoreRepeatedLetters: boolean,
  answers: string[],
  triggers: string[]
): Promise<ID> {

  const url = (triggerGroupId)
    ? `${urls.config}/trigger_groups/${triggerGroupId}`
    : `${urls.config}/trigger_groups`;
  const requestMethod = (triggerGroupId)
    ? axios.put
    : axios.post;
  
  const answersToSend = answers.map((text) => ({text}));
  const triggersToSend = triggers.map((expression) => ({expression}));
  const body = {
    'answers': answersToSend,
    'triggers': triggersToSend,
    'ignore_case': ignoreCase,
    'ignore_repeated_letters': ignoreRepeatedLetters
  };

  const {data} = await requestMethod(url, body);
  return data.trigger_group_id;
}