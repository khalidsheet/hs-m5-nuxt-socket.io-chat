import { Socket } from "socket.io";

const clients: Map<string, Socket>[] = [];

export const clientList = (io: Socket) => {};
