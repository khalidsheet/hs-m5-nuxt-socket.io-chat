<script setup lang="ts">
const { io } = useSocketIO();

const clients = ref();

io.on("update-client-list", (_clients) => {
  console.log("should be updated", clients);
  clients.value = _clients;

  console.log(clients.value);
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
