<script setup lang="ts">
import { useUserStore } from "~~/store/user-store";
import { PublicMessage } from "../../interfaces/message";
const { io } = useSocketIO();
const { getUser } = useUserStore();

const props = defineProps<{
  messages: PublicMessage[];
}>();

const isTyping = ref(false);
const typingEvent = ref<Partial<PublicMessage>>();

io.on("user-typing", (message: Partial<PublicMessage>) => {
  typingEvent.value = message;

  if (getUser()?.nickname !== message.from) {
    isTyping.value = true;

    const timeout = setTimeout(() => {
      isTyping.value = false;
      clearTimeout(timeout);
    }, 1000);
  }
});
</script>
<template>
  <div class="min:h-screen pb-10">
    <ChatMessage
      :message="{
        message: 'You just joined the chat',
        date: new Date(),
        type: 'system',
      }"
    />
    <ChatMessage v-for="message in messages" :message="message" />
    <div v-if="isTyping" class="typing-event">
      {{ typingEvent?.from }} is typing...
    </div>
  </div>
</template>
<style scoped>
.typing-event {
  @apply block absolute bottom-16 w-full px-5 z-10 text-sm text-gray-500;
}
</style>
