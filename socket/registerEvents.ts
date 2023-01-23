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

  io.on("disconnect", () => {
    io.broadcast.emit("join", <PublicMessage>{
      date: new Date(),
      from: io.id,
      message: "just left the chat.",
      type: "system",
    });
  });
};
