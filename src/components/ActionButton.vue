<template>
  <RouterLink v-bind:to="link" :title="title">{{ label }}</RouterLink>
</template>

<script setup lang="ts">
defineProps(['label', 'link', 'title']) 
</script>

<style scoped>
a {
  border-radius: var(--border-radius);
  color: var(--text-color-secondary);
}
</style>