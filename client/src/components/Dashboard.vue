<template>
  <div class="card">
    <Tabs v-model:value="value">
      <TabList>
        <Tab value="0"> 
            <div class="tab">
                <span>Working</span>
                <span><Badge :value="workingCount" size="small"></Badge></span>
            </div>
        </Tab>
        <Tab value="1"> 
            <div class="tab">
                <span>Rejects</span>
                <span><Badge :value="rejectCount" size="small"></Badge></span>
            </div>
        </Tab>
        <Tab value="2">
            <div class="tab">
                <span>Complete</span>
                <span><Badge :value="doneCount" size="small"></Badge></span>
            </div>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <slot name="panel-1"></slot>
        </TabPanel>
        <TabPanel value="1">
          <slot name="panel-2"></slot>
        </TabPanel>
        <TabPanel value="2">
          <slot name="panel-3"></slot>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
    workingCount: {
        type: Number,
        default: 0
    },
    rejectCount: {
        type: Number,
        default: 0
    },
    doneCount: {
        type: Number,
        default: 0
    },
})

const value = ref('0')
</script>
<style scoped>
.tab {
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
    align-items: center;
}
</style>