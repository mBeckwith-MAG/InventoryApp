<template>
  <Card :class="bgColor">
    <template #title>
      <div class="title-row">
        <div class="item-title">
          <div>Item: {{ item.uid }}</div>
          <small>Type: {{ item.carType }}</small>
          <small>Status: {{ item.status }}</small>
        </div>
        <div>
          <PriorityDropdown
            :val="item.priority"
            @change-prio="(newValue) => changePrio(item.uid, newValue)"
          />
        </div>
      </div>
    </template>
    <template #content>
      <div class="item-content">
        <!-- Not doing the payoff section anymore, just notes for now to save time. Can add back later if needed. -->
        <!-- <PayoffSection 
                    v-if="hasPayoff"
                    :titleOrPayoff="item.titleOrPayoff"
                    :titleStatus="item.titleStatus"
                    :payoffAmount="item.payoffAmount"
                    :goodTillDate="item.goodTillDate"
                    :lienHolder="item.lienHolder"
                    :perDiam="item.perDiam"
                />
                <PayoffSection v-else /> -->
        <Notes :data="item.notes" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { useMondayStore } from '@/stores/monday'
import Notes from './Notes.vue'
import PayoffSection from './PayoffSection.vue'
import PriorityDropdown from './PriorityDropdown.vue'

const props = defineProps({
  item: Object,
})

const store = useMondayStore()
const { updatePrio } = store

const hasPayoff = computed(() => {
  if (
    props.item.titleOrPayoff ||
    props.item.titleStatus ||
    props.item.payoffAmount ||
    props.item.goodTillDate ||
    props.item.lienHolder ||
    props.item.perDiam
  )
    return true
  return false
})

const bgColor = computed(() => {
  switch (props.item.status) {
    case 'Done':
      return 'done'
    case 'Reject':
      return 'reject'
    default:
      return 'working'
  }
})

const changePrio = (itemId, newValue) => {
  updatePrio(itemId, newValue)
}
</script>

<style scoped>
.title-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.item-title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item-content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1rem;
}
.item-general-info {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.centered {
  text-align: center;
}
.done {
  border-left: 20px solid rgba(39, 164, 74, 0.3);
}
.reject {
  border-left: 20px solid rgba(164, 39, 39, 0.3);
}
.working {
  border-left: 20px solid rgba(164, 122, 39, 0.3);
}
</style>
