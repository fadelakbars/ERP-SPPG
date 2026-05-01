<script setup lang="ts">
// No logic needed here for now
</script>

<template>
  <router-view></router-view>
</template>

<style>
/* Global styles can go here or in style.css */
body {
  margin: 0;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

/* Helper classes for mock-ups */
.text-blue-600 { color: #2563eb; }
.text-orange-600 { color: #ea580c; }
.text-green-600 { color: #16a34a; }
.text-purple-600 { color: #9333ea; }
.text-emerald-600 { color: #059669; }
</style>
