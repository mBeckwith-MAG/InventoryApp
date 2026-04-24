<template>
  <div class="title-row">
    <HomeButton />
    <div class="store-name">
      {{ storeName }}
    </div>
  </div>
  <div v-if="loading">Loading...</div>
  <div v-else-if="!loading && !itemCount">No Items</div>
  <div v-else>
    <Dashboard :workingCount="workingCount" :rejectCount="rejectCount" :doneCount="doneCount">
      <template #panel-1>
        <div class="tiles-group">
          <div v-for="workingItem in workingItems" :key="workingItem.uid">
            <ItemCard :item="workingItem" />
          </div>
        </div>
      </template>
      <template #panel-2>
        <div class="rows-group">
          <div v-for="rejectItem in rejectItems" :key="rejectItem.uid">
            <ItemRow :item="rejectItem" class="item reject" />
          </div>
        </div>
      </template>
      <template #panel-3>
        <div class="rows-group">
          <div v-for="doneItem in doneItems" :key="doneItem.uid">
            <ItemRow :item="doneItem" class="item done" />
          </div>
        </div>
      </template>
    </Dashboard>
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
import Dashboard from '@/components/Dashboard.vue'

const store = useMondayStore()
const { loading, itemCount } = storeToRefs(store)
const { getItemsByStore } = store

const route = useRoute()

const items = ref([])
const storeName = ref('')
const workingCount = ref(0)
const rejectCount = ref(0)
const doneCount = ref(0)

onMounted(() => {
  if (route.params.name) {
    storeName.value = route.params.name.toUpperCase().replaceAll('-', ' ')
    getItemsByStore(route.params.name).then((res) => (items.value = res))
  }
})

const workingItems = computed(() => {
  if (items.value.length) {
    const itms = items.value.filter((item) => item.status != 'Done' && item.status != 'Reject')
    workingCount.value = itms.length
    return itms
  }
})

const doneItems = computed(() => {
  if (items.value.length) {
    const itms = items.value.filter((item) => item.status == 'Done')
    doneCount.value = itms.length
    return itms
  }
})

const rejectItems = computed(() => {
  if (items.value.length) {
    const itms = items.value.filter((item) => item.status == 'Reject')
    rejectCount.value = itms.length
    return itms
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
.non-working-group {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  margin: 1rem;
  padding: 1rem;
  text-align: center;
}
.tiles-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
.rows-group {
  display: grid;
  gap: 1rem;
}
</style>
