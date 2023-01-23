<template>
  <div class="layout">
    <Header />
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div class="flex">
      <div class="side-menu">
        <SideChatList />
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>
<style scoped>
.layout {
  @apply flex flex-col h-screen w-screen bg-gray-200 text-gray-900;
}
</style>
