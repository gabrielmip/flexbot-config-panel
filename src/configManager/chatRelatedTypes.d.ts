export interface Chat {
  "chat_id": number,
  "title": string,
  "trigger_groups": Array<TriggerGroup>
}

export interface TriggerGroup {
  "trigger_group_id": number,
  "chat_id": number,
  "ignore_case": boolean,
  "ignore_repeated_letters": boolean,
  "answers": Array<Answer>,
  "triggers": Array<Trigger>
}

export interface Answer {
  "answer_id": number,
  "text": string,
  "trigger_group_id": number
}

export interface Trigger {
  "expression": string,
  "trigger_group_id": number,
  "trigger_id": number
}