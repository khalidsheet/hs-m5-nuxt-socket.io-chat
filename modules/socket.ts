import { defineNuxtModule } from "@nuxt/kit";
import { Server } from "socket.io";

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("listen", (server) => {
      const socket = new Server(server);
      socket.on("connection", (io) => {
        console.log(io.id, "has connected");
      });
    });
  },
});
