<script setup lang="ts">
import { useUserStore } from "~~/store/user-store";

const { io } = useSocketIO();
const { getUser } = useUserStore();

const clients = ref();

io.on("update-client-list", (_clients) => {
  console.log("hey");
  clients.value = _clients;
});

onMounted(() => {
  io.emit("fetch-client-list");
});
</script>

<template>
  <div class="chatlist">
    <SideChatItem v-for="client in clients" :client="client" />
  </div>
</template>
<style scoped>
.chatlist {
  @apply bg-gray-300 w-64 h-screen block overflow-y-scroll scroll-smooth pb-3;
  height: calc(100vh - 4rem);
}
</style>
