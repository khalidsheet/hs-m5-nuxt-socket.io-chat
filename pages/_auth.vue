<script setup>
import { useUserStore } from "~~/store/user-store";

definePageMeta({
  layout: "auth",
});
const { setUser } = useUserStore();
const { io } = useSocketIO();
const router = useRouter();

const nickname = ref("");

const onJoin = () => {
  setUser({
    nickname: nickname.value,
  });
  io.emit("join-user", nickname.value);
  router.push("/");
};
</script>
<template>
  <div class="flex h-screen w-screen bg-gray-900 items-center justify-center">
    <div class="nickname">
      <div class="text-white text-3xl mb-5">What should we call you?</div>
      <input
        type="text"
        class="w-full h-12 rounded-lg text-center outline-none"
        placeholder="Enter your nickname"
        v-model="nickname"
        @keyup.enter="onJoin"
      />
      <button
        class="w-full h-12 rounded-lg text-center text-white bg-green-500 mt-4 hover:bg-green-700"
        @click="onJoin"
      >
        Let's gooo!
      </button>
    </div>
  </div>
</template>
<style scoped></style>
