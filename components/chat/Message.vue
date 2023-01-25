<script setup lang="ts">
import { PrivateMessage, PublicMessage } from "~~/interfaces/message";
import { useUserStore } from "~~/store/user-store";

const { getUser } = useUserStore();
const messageRef = ref();

const props = defineProps<{
  message: PublicMessage | PrivateMessage;
}>();

console.log(props.message);

if (props.message.kind != "imageUrl") {
  console.log("not imageUrl");

  let urlRegex =
    /([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/gi;
  messageRef.value = props.message.message.replaceAll(
    urlRegex,
    `<a href="$1" class="text-orange-400" target="_blank">$1</a>`
  );
} else {
  console.log("else");

  if (props.message.kind == "imageUrl") {
    console.log("not an image");

    messageRef.value = props.message.message;
  }
}

const currentUser = getUser()?.nickname;
</script>
<template>
  <div class="message-container" :class="message.type">
    <div class="message" :class="currentUser == message.from ? 'me' : 'others'">
      <div v-if="message.kind == 'imageUrl'">
        <img :src="messageRef" :alt="messageRef" class="rounded-md w-96" />
      </div>
      <div v-else class="content" v-html="messageRef"></div>
      <div v-if="message.type != 'system'" class="info block w-full">
        {{ message.from }} -
        {{
          new Intl.DateTimeFormat("en-us", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(message.date))
        }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.message-container {
  @apply p-2 w-full clear-both min-h-full relative;
}
.message-container.system {
  @apply flex items-center justify-center rounded-lg;
}

.message-container.system .content {
  @apply border border-gray-400 text-sm;
}

.message .content {
  @apply py-2 px-4 rounded-lg shadow-md;
}

.system .message {
  @apply bg-gray-300 text-gray-700 rounded-lg;
}

.client .message .content {
  @apply bg-white text-gray-700 max-w-3xl text-justify mt-6;
}

.client .message.me {
  @apply float-right;
}

.client .message.me .content {
  @apply bg-gray-900 text-white;
}

.info {
  @apply text-xs pl-2 mt-1 mb-3 text-gray-400;
}

.client .message.others {
  @apply float-left;
}
</style>
