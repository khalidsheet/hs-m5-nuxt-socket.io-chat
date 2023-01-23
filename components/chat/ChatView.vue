<script setup lang="ts">
import { PublicMessage } from "../../interfaces/message";

const props = defineProps<{
  messages: PublicMessage[];
}>();
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
  </div>
</template>
