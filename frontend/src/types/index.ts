export interface Message {
  id: string;
  text: string;
  timestamp: string;
  is_read: boolean;
}

export interface MessageCreate {
  text: string;
}