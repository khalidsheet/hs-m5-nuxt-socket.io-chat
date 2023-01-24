import { PublicMessage } from "./../interfaces/message/PublicMessage";
import { Message } from "./../interfaces/message/Message";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

/**
 * Registers all the required events
 * @param io Socket
 */
export const registerEvents = (
  io: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on("broadcast-message", (message: PublicMessage) => {
    io.broadcast.emit("message-broadcasted", message);
  });

  io.on("join-user", (nickname: string) => {
    // this one should handle joining of the user and the nickname
  });

  io.on("disconnect", () => {
    io.broadcast.emit("join", <PublicMessage>{
      date: new Date(),
      from: io.id,
      message: `${io.id} just left the chat.`,
      type: "system",
    });
  });
};
