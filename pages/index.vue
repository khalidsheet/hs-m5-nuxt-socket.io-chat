<script setup lang="ts">
import { Ref } from "vue";
import { PublicMessage } from "~~/interfaces/message";
import { useUserStore } from "~~/store/user-store";
import { useScroll, useTitle, useWindowFocus } from "@vueuse/core";

definePageMeta({
  middleware: "auth",
});

const focused = useWindowFocus();
const flip = ref(false);
const audio = new Audio("/sounds/notification.wav");

const updatePageTitle = (title: string) => {
  console.log("test sss");
  useTitle(title);
  return;

  const interval = setInterval(() => {
    console.log("in");

    if (flip.value) {
      useTitle(title);
    } else {
      useTitle("FoxyChat - Chat for all");
    }

    flip.value = !flip.value;

    if (focused.value) {
      useTitle("FoxyChat - Chat for all");
      clearInterval(interval);
    }
  }, 2000);
};

const el = ref<HTMLElement | null>(null);

const { y } = useScroll(el, {
  behavior: "smooth",
});

const messageContent = ref<string>();
const messages: Ref<PublicMessage[]> = ref([]);

const { io } = useSocketIO();
const userStore = useUserStore();

io.on("connect", () => {
  console.log(io.id);
});

io.on("join", (message: PublicMessage) => {
  console.log(message);
  messages.value.push(message);
});

io.on("message-broadcasted", (message: PublicMessage) => {
  messages.value.push(message);
  updatePageTitle(`${message.from} sent a message`);
  setTimeout(() => {
    y.value = el.value?.scrollHeight ?? 0;
  }, 50);
  audio.volume = 0.2;
  audio.play();
});

io.on("disconnect", () => {
  console.log(io.id, "disconnected");
});

const sendMessage = (e: KeyboardEvent) => {
  const code: string = e.code;

  // send typing event
  if (e.code !== "Enter" && e.code !== "Backspace") {
    io.emit("typing", <Partial<PublicMessage>>{
      from: userStore.getUser()?.nickname,
      type: "client",
    });
  }

  if (code == "Enter" && e.shiftKey) {
    return;
  }

  if (code == "Enter") {
    if (messageContent.value?.trim() == "") {
      return;
    }

    io.emit("broadcast-message", <PublicMessage>{
      date: new Date(),
      message: messageContent.value?.trim(),
      from: userStore.getUser()?.nickname,
      type: "client",
      kind: !isImage(<string>messageContent.value?.trim())
        ? "text"
        : "imageUrl",
    });

    messages.value.push(<PublicMessage>{
      date: new Date(),
      message: messageContent.value?.trim(),
      from: userStore.getUser()?.nickname,
      type: "client",
      kind: !isImage(<string>messageContent.value?.trim())
        ? "text"
        : "imageUrl",
    });

    messageContent.value = "";
    setTimeout(() => {
      y.value = el.value?.scrollHeight ?? 0;
    }, 50);
  }
};

function isImage(url: string) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
</script>
<template>
  <div>
    <div ref="el" class="chat-view">
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
  @apply w-full h-full px-5 py-2 max-h-full min-h-full rounded-md outline-none text-sm focus:h-32 transition-all;
  width: calc(100vw - 276px);
  max-width: calc(100vw - 256px);
}
</style>
