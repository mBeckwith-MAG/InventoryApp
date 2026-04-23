<template>
  <div>
    <div>{{ itemId }}</div>
    <div v-if="notes">{{ notes }}</div>
  </div>
</template>

<script setup>
defineProps({
  itemId: Number,
  notes: {
    type: String | null,
    default: null,
  },
})
</script>
