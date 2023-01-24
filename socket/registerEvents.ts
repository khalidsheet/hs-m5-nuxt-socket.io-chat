import { setClient, getClient, getClients } from "./clientList";
import { PublicMessage } from "./../interfaces/message/PublicMessage";
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
    setClient(nickname, io.id);

    io.broadcast.emit("join", <PublicMessage>{
      date: new Date(),
      from: io.id,
      message: `${nickname} just joind the chat.`,
      type: "system",
    });

    console.log("ss", getClients());

    const clients = [...getClients()];

    io.broadcast.emit("update-client-list", clients);
  });
};
