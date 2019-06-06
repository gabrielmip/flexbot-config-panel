import axios from "axios";

import urls from '../../config/urls';
import { ID, Chat, TriggerGroup } from "./chatRelatedTypes";

export async function getChatInfo (token: string): Promise<Chat> {
  const url = `${urls.config}/${token}`;
  const { data: chat } = await axios.get(url);
  return chat;
}

export async function updateTriggerGroup (
  triggerGroup: TriggerGroup,
  ignore_case: boolean,
  ignore_repeated_letters: boolean,
  answers: Array<string>,
  triggers: Array<string>
): Promise<ID> {
  const answersToSend = answers.map((text) => ({text}));
  const triggersToSend = triggers.map((expression) => ({expression}));

  const url = (triggerGroup.trigger_group_id)
    ? `${urls.config}/trigger_groups/${triggerGroup.trigger_group_id}`
    : `${urls.config}/trigger_groups`;
  const method = (triggerGroup.trigger_group_id)
    ? axios.put
    : axios.post;
  
  const body = {
    answers: answersToSend,
    triggers: triggersToSend,
    ignore_case,
    ignore_repeated_letters
  };

  return method(url, body)
    .then(({data: {trigger_group_id}}) => trigger_group_id);
}
