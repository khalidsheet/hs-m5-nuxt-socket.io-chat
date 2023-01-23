import { User } from "./../interfaces/User";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();

  const setUser = (entity: User): void => {
    user.value = entity;
  };

  const getUser = (): User | undefined => {
    return user.value;
  };

  return { setUser, getUser };
});
