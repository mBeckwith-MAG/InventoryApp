<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useMondayStore } from './stores/monday'
import { onMounted } from 'vue'

const store = useMondayStore()
const { getItems } = store

onMounted(() => {
  getItems()
})
</script>

<style scoped></style>
