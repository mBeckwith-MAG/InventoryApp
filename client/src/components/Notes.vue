<template>
  <div class="notes-container">
    <small>Notes</small>
    <div>{{ data }}</div>
  </div>
</template>
<script setup>
defineProps({
  data: String,
})
</script>
<style scoped>
.notes-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 1rem;
}
</style>
