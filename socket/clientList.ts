export type Client = Map<string, string>;

const clients: Client = new Map();

export const setClient = (nickname: string, socketId: string) => {
  let userExists = false;

  if (!clients.has(socketId)) {
    clients.set(socketId, nickname);
  }

  clients.forEach((client) => {
    if (client === nickname) {
      userExists = true;
    }
  });

  if (!userExists) {
    clients.set(socketId, nickname);
  }
};

export const getClients = (): Client => {
  return clients;
};

export const getClient = (socketId: string): string | undefined => {
  return clients.get(socketId);
};

export const removeClient = (socketId: string): boolean => {
  return clients.delete(socketId);
};
