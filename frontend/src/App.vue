<script setup lang="ts">

</script>

<template>
  <router-view />
</template>

<style>
/* 全局变量 - 莫兰迪色系 */
:root {
  --morandi-green: #9CAF88;
  --beige: #F5F1E8;
  --light-gray: #E8E8E8;
  --soft-blue: #A8C5D1;
  --dark-text: #4A4A4A;
  --light-text: #7A7A7A;
  --white: #FFFFFF;
  --shadow: rgba(0, 0, 0, 0.08);
  --hover-shadow: rgba(0, 0, 0, 0.12);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--light-gray);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--morandi-green);
}
</style>
