import { User } from "firebase/auth";
import { defineStore } from "pinia";

export interface FireUser {
  user: User;
  socketId?: string;
  nickname?: string;
}

export const useFireUser = defineStore("user", () => {
  const user = ref<FireUser | null>();

  const setUser = (entity: FireUser | null): void => {
    user.value = entity;
  };

  const getUser = (): FireUser | undefined => {
    return <FireUser>user.value;
  };

  const getDisplayName = () => {};

  return { setUser, getUser, getDisplayName };
});
