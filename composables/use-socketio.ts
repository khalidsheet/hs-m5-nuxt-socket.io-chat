import { io } from "socket.io-client";

export function useSocketIO() {
  const socket = io();

  return {
    io: socket,
  };
}
