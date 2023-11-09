<template>
  <div>
    content
  </div>
</template>

<script setup>
  defineOptions({
    name: 'menuItemContent'
  })

  defineProps({
    item: {
      type: Object,
      default: () => {}
    }
  })
</script>

<style scoped>

</style>