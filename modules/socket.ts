import { defineNuxtModule } from "@nuxt/kit";
import { Server } from "socket.io";
import { PublicMessage } from "../interfaces/message";
import { registerEvents } from "../socket/registerEvents";

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("listen", (server) => {
      const socket = new Server(server);
      socket.on("connection", (io) => {
        io.broadcast.emit("join", <PublicMessage>{
          date: new Date(),
          from: io.id,
          message: "just joind the chat.",
          type: "system",
        });
        console.log(io.id, "has connected");
        registerEvents(io);
      });
    });
  },
});
