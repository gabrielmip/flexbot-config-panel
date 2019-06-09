type ID = number;

export interface Chat {
  'chatId': ID;
  'title': string;
  'triggerGroups': TriggerGroup[];
}

export interface TriggerGroup {
  'triggerGroupId'?: ID;
  'chatId': ID;
  'ignoreCase': boolean;
  'ignoreRepeatedLetters': boolean;
  'answers': Answer[];
  'triggers': Trigger[];
}

export interface Answer {
  'answerId': ID;
  'text': string;
  'triggerGroupId': ID; 
}

export interface Trigger {
  'expression': string;
  'triggerGroupId': ID;
  'triggerId': ID;
}

export interface IOChat {
  'chat_id': ID;
  'title': string;
  'trigger_groups': IOTriggerGroup[];
}

export interface IOTriggerGroup {
  'trigger_group_id'?: ID;
  'chat_id': ID;
  'ignore_case': boolean;
  'ignore_repeated_letters': boolean;
  'answers': IOAnswer[];
  'triggers': IOTrigger[];
}

export interface IOAnswer {
  'answer_id': ID;
  'text': string;
  'trigger_group_id': ID; 
}

export interface IOTrigger {
  'expression': string;
  'trigger_group_id': ID;
  'trigger_id': ID;
}