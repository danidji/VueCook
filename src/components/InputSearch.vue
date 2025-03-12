<script setup lang="ts">
import IconImage from './IconImage.vue'

const {name} = defineProps<{
  name?: string
}>()
</script>

<template>
  <IconImage type="search" />
  <input :name="name" />
</template>
