import { Message } from "./Message";

export interface PrivateMessage extends Message {
  from: string;
  to: string;
}
