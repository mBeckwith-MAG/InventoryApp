<template>
  <Card>
    <template #title>
      <div id="item-row">
        <small>{{ item.uid }}</small>
        <small>{{ item.notes }}</small>
      </div>
    </template>
  </Card>
</template>

<script setup>
defineProps({
  item: Object,
})
</script>

<style scoped>
#item-row {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}
small {
  font-size: small;
}
.done {
  border-left: 20px solid rgba(39, 164, 74, 0.3);
}
.reject {
  border-left: 20px solid rgba(164, 39, 39, 0.3);
}
</style>
