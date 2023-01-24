import { getClient, getClients, removeClient } from "./../socket/clientList";
import { defineNuxtModule } from "@nuxt/kit";
import { Server } from "socket.io";
import { PublicMessage } from "../interfaces/message";
import { registerEvents } from "../socket/registerEvents";

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("listen", (server) => {
      const socket = new Server(server);
      socket.on("connection", (io) => {
        registerEvents(io, socket);

        io.on("disconnect", () => {
          if (getClient(io.id)) {
            io.broadcast.emit("join", <PublicMessage>{
              date: new Date(),
              from: io.id,
              message: `${getClient(io.id)} just left the chat.`,
              type: "system",
            });
          }

          removeClient(io.id);
          const clients = [...getClients()];
          io.broadcast.emit("update-client-list", clients);
        });
      });
    });
  },
});
