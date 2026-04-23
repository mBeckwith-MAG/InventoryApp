<template>
  <RouterLink to="/" custom v-slot="{ navigate }">
    <Button @click="navigate" role="link" severity="info"> Home </Button>
  </RouterLink>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
