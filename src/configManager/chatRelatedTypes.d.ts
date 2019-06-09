type ID = number;

export interface Chat {
  'chat_id': ID;
  'title': string;
  'trigger_groups': TriggerGroup[];
}

export interface TriggerGroup {
  'trigger_group_id'?: ID;
  'chat_id': ID;
  'ignore_case': boolean;
  'ignore_repeated_letters': boolean;
  'answers': Answer[];
  'triggers': Trigger[];
}

export interface Answer {
  'answer_id': ID;
  'text': string;
  'trigger_group_id': ID; 
}

export interface Trigger {
  'expression': string;
  'trigger_group_id': ID;
  'trigger_id': ID;
}