<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="!loading && !items.length">No Items</div>
  <div v-else v-for="item in items" :key="item.id">{{ item }}</div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { useMondayStore } from './stores/monday';
import { storeToRefs } from 'pinia';

const store = useMondayStore();
const { loading } = storeToRefs(store);
const { getItemsByStore } = store

const items = ref([])

onMounted(() => {
  getItemsByStore('morgan-chevy')
  .then(res => items.value = res)
})
</script>


<style scoped></style>