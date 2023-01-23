<script setup lang="ts">
import { Ref } from "vue";
import { PublicMessage } from "~~/interfaces/message";

const messageContent = ref<string>();
const messages: Ref<PublicMessage[]> = ref([]);

const { io } = useSocketIO();

io.on("connect", () => {
  console.log(io.id);
});

io.on("join", (message: PublicMessage) => {
  console.log(message);
  messages.value.push(message);
});

io.on("message-broadcasted", (message: PublicMessage) => {
  messages.value.push(message);

  console.log({ message });

  console.log(messages.value);
});

io.on("disconnect", () => {
  console.log(io.id, "disconnected");
});

const sendMessage = (e: KeyboardEvent) => {
  const code = e.code;
  console.log({ code });

  if (code == "Enter" && e.shiftKey) {
    console.log("enter", messageContent.value);
    io.emit("broadcast-message", <PublicMessage>{
      date: new Date(),
      message: messageContent.value,
      from: "khalid",
      type: "client",
    });

    messages.value.push(<PublicMessage>{
      date: new Date(),
      message: messageContent.value,
      from: "khalid",
      type: "client",
    });

    messageContent.value = "";
  }
};
</script>
<template>
  <div>
    <div class="chat-view">
      <ChatView :messages="messages" />
    </div>
    <div class="controls">
      <textarea
        type="text"
        placeholder="Write your message and press enter to send."
        v-model="messageContent"
        @keyup="sendMessage"
      ></textarea>
    </div>
  </div>
</template>
<style scoped>
.chat-view {
  max-height: calc(100vh - 6rem);
  @apply overflow-y-scroll overflow-x-hidden pb-24;
}

.controls {
  @apply absolute bottom-2 w-full h-12 flex items-center justify-center transition-all;
  width: calc(100vw - 256px);
}

.controls textarea {
  @apply w-full h-full px-5 py-2  min-h-full rounded-md outline-none text-sm focus:h-32 focus:mb-20 transition-all;
  width: calc(100vw - 276px);
  max-width: calc(100vw - 256px);
}
</style>
