<script setup lang="ts">
import { useUserStore } from "~~/store/user-store";

const { setUser } = useUserStore();
const { io } = useSocketIO();

const logout = () => {
  setUser(null);
  io.emit("forceDisconnect");
};
</script>
<template>
  <div
    class="bg-gray-900 w-screen h-16 flex items-center justify-between px-8 text-gray-100"
  >
    <div class="text-2xl uppercase">
      <img src="/images/logo.png" alt="" class="h-8" />
    </div>
    <div
      class="uppercase bg-red-600 text-white px-8 py-2 rounded-md hover:bg-red-700 cursor-pointer"
      @click="logout"
    >
      logout
    </div>
  </div>
</template>
