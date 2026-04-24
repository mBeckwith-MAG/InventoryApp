<template>
  <div class="prio-container" v-if="currentVal">
    <Button
      icon="pi pi-plus"
      aria-label="Increase Priority"
      severity="secondary"
      @click="increasePrio"
      :class="{ 'p-disabled': currentIndex === options.length - 1 }"
      size="small"
    />
    <small class="prio-value">{{ currentVal }}</small>
    <Button
      icon="pi pi-minus"
      aria-label="Decrease Priority"
      severity="secondary"
      @click="decreasePrio"
      :class="{ 'p-disabled': currentIndex === 0 }"
      size="small"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'

const emit = defineEmits(['changePrio'])

const props = defineProps({
  val: String,
})

const currentVal = ref('')

const options = ref([
  { text: 'Low', index: 5 },
  { text: 'Medium', index: 109 },
  { text: 'High', index: 110 },
  { text: 'Critical ⚠️️', index: 10 },
])

onBeforeMount(() => {
  currentVal.value = options.value[getIndex(props.val)].text
})

const getIndex = (txt) => {
  return options.value.findIndex((opt) => opt.text == txt)
}

const currentIndex = computed(() => {
  if (currentVal.value) {
    return getIndex(currentVal.value)
  }
})

const increasePrio = () => {
  if (currentIndex.value < options.value.length - 1) {
    const newOpt = options.value[currentIndex.value + 1]
    currentVal.value = newOpt.text
    emit('changePrio', newOpt.index)
  }
}

const decreasePrio = () => {
  if (currentIndex.value != 0) {
    const newOpt = options.value[currentIndex.value - 1]
    currentVal.value = newOpt.text
    emit('changePrio', newOpt.index)
  }
}
</script>

<style scoped>
.prio-container {
  display: flex;
  flex-direction: column;
  width: 6rem;
  align-items: center;
  font-size: small;
}
.prio-value {
  display: flex;
  align-items: center;
  height: 4rem;
}
</style>
