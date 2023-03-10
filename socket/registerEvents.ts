import { setClient, getClient, getClients } from "./clientList";
import { PublicMessage } from "./../interfaces/message/PublicMessage";
import { Server, Socket } from "socket.io";

/**
 * Registers all the required events
 * @param io Socket
 */
export const registerEvents = (io: Socket, socket: Server) => {
  io.on("broadcast-message", async (message: PublicMessage) => {
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

    setTimeout(() => {
      const clients = [...getClients()];
      io.broadcast.emit("update-client-list", clients);
    }, 100);
  });

  io.on("typing", (message: Partial<PublicMessage>) => {
    io.broadcast.emit("user-typing", message);
  });

  io.on("fetch-client-list", () => {
    const clients = [...getClients()];
    io.emit("update-client-list", clients);
  });

  io.on("forceDisconnect", () => {
    io.disconnect(true);
  });
};
