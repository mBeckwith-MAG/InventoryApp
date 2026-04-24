<template>
  <RouterLink to="/" custom v-slot="{ navigate }">
    <Button @click="navigate" role="link" severity="info" outlined icon="pi pi-home" />
  </RouterLink>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
