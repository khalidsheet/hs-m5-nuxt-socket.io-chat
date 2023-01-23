<template>
  <div class="chatlist">
    <SideChatItem />
  </div>
</template>
<style scoped>
.chatlist {
  @apply bg-gray-300 w-64 h-screen block overflow-y-scroll scroll-smooth pb-3;
  height: calc(100vh - 4rem);
}
</style>
