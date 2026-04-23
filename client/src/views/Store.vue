<template>
  <div class="title-row">
    <HomeButton />
    <div class="store-name">
      {{ storeName }}
    </div>
  </div>
  <div v-if="loading">Loading...</div>
  <div v-else-if="!loading && !itemCount">No Items</div>
  <div v-else class="dashboard-group">
    <div v-for="workingItem in workingItems" :key="workingItem.uid">
      <ItemCard :item="workingItem" />
    </div>
  </div>
  <div>
    Done Items
    <div v-for="doneItem in doneItems" :key="doneItem.uid">
      <ItemRow :itemId="doneItem.uid" />
    </div>
  </div>
  <div>
    Rejected Items
    <div v-for="rejectItem in rejectItems" :key="rejectItem.uid">
      <ItemRow :itemId="rejectItem.uid" :notes="rejectItem.notes" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMondayStore } from '@/stores/monday'
import { storeToRefs } from 'pinia'
import HomeButton from '@/components/HomeButton.vue'
import ItemCard from '@/components/ItemCard.vue'
import ItemRow from '@/components/ItemRow.vue'

const store = useMondayStore()
const { loading, itemCount } = storeToRefs(store)
const { getItemsByStore } = store

const route = useRoute()

const items = ref([])
const storeName = ref()

onMounted(() => {
  if (route.params.name) {
    storeName.value = route.params.name.toUpperCase().replaceAll('-', ' ')
    getItemsByStore(route.params.name).then((res) => (items.value = res))
  }
})

const workingItems = computed(() => {
  if (items.value.length) {
    return items.value.filter((item) => item.status != 'Done' && item.status != 'Reject')
  }
})

const doneItems = computed(() => {
  if (items.value.length) {
    return items.value.filter((item) => item.status == 'Done')
  }
})

const rejectItems = computed(() => {
  if (items.value.length) {
    return items.value.filter((item) => item.status == 'Reject')
  }
})
</script>

<style scoped>
.title-row {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  align-items: center;
  margin: 1rem;
}
.store-name {
  text-transform: capitalize;
  font-size: xx-large;
}
.dashboard-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
