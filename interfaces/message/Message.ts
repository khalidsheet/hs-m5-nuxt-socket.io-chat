export interface Message {
  message: string;
  date: Date;
  type: "system" | "client";
}
