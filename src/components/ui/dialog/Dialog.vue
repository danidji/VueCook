<script setup lang="ts">
import {useAppStore} from '@/store/app.store'
import {
  DialogRoot,
  type DialogRootEmits,
  type DialogRootProps,
  useForwardPropsEmits,
} from 'radix-vue'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const store = useAppStore()
</script>

<template>
  <DialogRoot v-bind="forwarded" v-model:open="store.isOpenDialog">
    <slot />
  </DialogRoot>
</template>
