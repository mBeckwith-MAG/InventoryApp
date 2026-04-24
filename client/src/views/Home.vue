<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="itemCount">
    <p class="link-row-label">Pick a Store</p>
    <div class="link-row">
      <div v-for="store in storeOptions">
        <RouteButton :name="store" />
      </div>
    </div>
  </div>
  <div v-else>
    <p>Something went wrong... Please reach out to mbeckwith@morganautogroup.com</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMondayStore } from '@/stores/monday'
import { storeToRefs } from 'pinia'
import RouteButton from '@/components/RouteButton.vue'

const store = useMondayStore()
const { getItems } = store
const { loading, itemCount, storeOptions } = storeToRefs(store)

onMounted(() => {
  getItems()
})
</script>

<style scoped>
.link-row-label {
  text-align: center;
}
.link-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
