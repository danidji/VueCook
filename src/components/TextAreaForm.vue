<script setup lang="ts">
import {FormControl, FormField, FormItem} from '@/components/ui/form'
import {Textarea} from '@/components/ui/textarea'

const {name, type, placeholder} = defineProps<{
  name: string
  type?: string
  placeholder?: string
}>()
</script>

<template>
  <FormField v-slot="{componentField, errorMessage}" :name="name">
    <FormItem>
      <FormControl>
        <Textarea
          :type="type"
          :placeholder="placeholder"
          v-bind="componentField"
          :class="errorMessage && 'ring-destructive ring-2 ring-offset-2 '" />
      </FormControl>
    </FormItem>
  </FormField>
</template>
