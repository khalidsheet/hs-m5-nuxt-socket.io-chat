export interface Message {
  message: string;
  date: Date;
  type: "system" | "client";
  kind?: "text" | "url" | "imageUrl";
}
