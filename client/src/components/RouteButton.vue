<template>
    <RouterLink :to="`/${url}`" custom v-slot="{ navigate }">
      <Button @click="navigate" role="link">
        {{ name }}
      </Button>
    </RouterLink>
</template>
<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps({
    name: String
})
const url = computed(() => {
    return props.name.toLowerCase().replaceAll(' ', '-')
})
</script>