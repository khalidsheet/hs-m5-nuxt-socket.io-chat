import { User } from "./../interfaces/User";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>();

  const setUser = (entity: User | null): void => {
    user.value = entity;
  };

  const getUser = (): User | undefined => {
    return <User>user.value;
  };

  return { setUser, getUser };
});
