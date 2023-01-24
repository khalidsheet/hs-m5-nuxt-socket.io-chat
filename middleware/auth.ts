import { useUserStore } from "./../store/user-store";
export default defineNuxtRouteMiddleware((to) => {
  const { getUser } = useUserStore();

  if (getUser()?.nickname == null) {
    return "/auth";
  }

  return true;
});
