import axios from "axios";

import urls from '../../config/urls';
import { ID, Chat, TriggerGroup } from "./chatRelatedTypes";

export async function getChatInfo (token: string): Promise<Chat> {
  const url = `${urls.config}/${token}`;
  const { data: chat } = await axios.get(url);
  return chat;
}

export async function deleteTriggerGroup (id: ID): Promise<boolean> {
  const url = `${urls.config}/trigger_groups/${id}`;
  const {data: {deleted}} = await axios.delete(url);
  return deleted;
}

export async function addTriggerGroup(chatId: ID) {
  const group: TriggerGroup = {
    chat_id: chatId,
    ignore_case: true,
    ignore_repeated_letters: true,
    answers: [],
    triggers: []
  };

  const trigger_group_id = await updateTriggerGroup(
    null,
    group.ignore_case,
    group.ignore_repeated_letters,
    [],
    []
  );
  
  return { ...group, trigger_group_id };
}

export async function updateTriggerGroup (
  triggerGroupId: ID | null,
  ignore_case: boolean,
  ignore_repeated_letters: boolean,
  answers: Array<string>,
  triggers: Array<string>
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
    answers: answersToSend,
    triggers: triggersToSend,
    ignore_case,
    ignore_repeated_letters
  };

  const {data: {trigger_group_id}} = await requestMethod(url, body);
  return trigger_group_id;
}