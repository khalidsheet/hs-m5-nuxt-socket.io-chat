<script setup lang="ts">
const { io } = useSocketIO();

io.on("connect", () => {
  console.log(io.id);
});

io.on("disconnect", () => {
  console.log(io.id, "disconnected");
});
</script>
<template>
  <div>s</div>
</template>
