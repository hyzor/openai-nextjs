export type Message = {
  prompt: string;
  message: string;
};

export type Conversation = {
  id: number;
  creationDate: string;
  lastMessageDate: string;
  messages: Message[];
};

export type User = {
  id: number;
  conversations: number[];
};
