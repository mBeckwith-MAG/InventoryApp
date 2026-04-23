<template>
  <div class="col-container" :class="colSize">
    <small>{{ label }}</small>
    <div>{{ val }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  val: String,
})

const colSize = computed(() => {
  const lbl = props.label.toLowerCase()
  switch (lbl) {
    case 'priority':
      return 'sm'
    case 'store':
      return 'lg'
    case 'notes':
      return 'xl'
    default:
      return 'md'
  }
})
</script>

<style scoped>
.col-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: left;
}

.col-container > small {
  margin-bottom: 1rem;
}

.xs {
  width: 2rem;
}

.sm {
  width: 4rem;
}

.md {
  width: 6rem;
}

.lg {
  width: 10rem;
}

.xl {
  width: 100%;
}
</style>
