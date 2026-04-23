<template>
  <div class="payoff-container">
    <Column label="Title or Payoff" :val="titleOrPayoff" />
    <Column label="Title Status" :val="titleStatus" />
    <Column label="Payoff Amount" :val="payoffAmount === 0 ? '' : payoffAmount" />
    <Column label="Good Till" :val="goodTillDate" />
    <Column label="Lien Holder" :val="lienHolder" />
    <Column label="Per Diam" :val="perDiam === 0 ? '' : perDiam" />
  </div>
</template>

<script setup>
import Column from './Column.vue'

const props = defineProps({
  titleOrPayoff: {
    type: String,
    default: '',
  },
  titleStatus: {
    type: String,
    default: '',
  },
  payoffAmount: {
    type: Number,
    default: 0,
  },
  goodTillDate: {
    type: String,
    default: '',
  },
  lienHolder: {
    type: String,
    default: '',
  },
  perDiam: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped>
.payoff-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  padding: 1rem;
  margin: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
</style>
