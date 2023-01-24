<script setup lang="ts">
defineProps<{
  client: any;
}>();
</script>
<template>
  <div v-if="client" class="chat-item">
    <div class="avatar"></div>
    <div class="nickname">{{ client[1] }}</div>
    <div class="message">
      <div class="content">{{ client[0] }}</div>
      <!-- <div class="date">1 min ago</div> -->
    </div>
  </div>
</template>
<style scoped>
.chat-item {
  @apply border-b-2 border-b-gray-400 p-2 hover:bg-gray-500 cursor-pointer;
}

.chat-item:hover .message {
  @apply text-gray-400;
}
.message {
  @apply text-sm flex justify-between items-center text-gray-500;
}

.message .date {
  @apply text-xs;
}
</style>
