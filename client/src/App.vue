<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="itemCount">
    <p class="link-row-label">Pick a Store</p>
    <div class="link-row">
      <div v-for="store in storeOptions">
        <RouteButton :name="store" />
      </div>
    </div>
    <RouterView />
  </div>
  <div v-else>
    Something went wrong... Please reach out to mbeckwith@morganautogroup.com
  </div>
</template>


<script setup>
import { RouterView } from 'vue-router';
import { useMondayStore } from './stores/monday';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import RouteButton from './components/RouteButton.vue';

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
  display: flex;
  justify-content: space-evenly;
}
</style>
