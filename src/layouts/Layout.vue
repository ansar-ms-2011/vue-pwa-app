<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="layout">
    <Header />

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #111827;
  color: white;
}

nav a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
}

.content {
  padding: 1rem;
}
.layout {
  width: 100% !important;
}
</style>
