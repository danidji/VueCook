<script setup lang="ts">
import IconSvg, {type IconKeys} from '@/assets'

const {type} = defineProps<{
  type: IconKeys
  size?: number
}>()

const IconSrc = IconSvg[type] || ''
</script>

<template>
  <img :src="IconSrc" alt="icon" :style="{width: `${size}px`, height: `${size}px`}" />
</template>
