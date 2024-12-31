<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Button, type ButtonVariants} from '@/components/ui/button'
import IconImage from './IconImage.vue'

defineProps<{
  title: string
  trigger?: string
  iconTrigger?: string
  triggerButtonVariant?: ButtonVariants['variant']
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button :variant="triggerButtonVariant">
        <span v-if="trigger">
          {{ trigger }}
        </span>
        <span v-else-if="iconTrigger">
          <IconImage :type="iconTrigger" />
        </span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>
      <slot />
    </DialogContent>
  </Dialog>
</template>
