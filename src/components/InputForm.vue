<script setup lang="ts">
import {FormControl, FormField, FormItem} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'

const {name, type, placeholder, label} = defineProps<{
  name: string
  type?: string
  label?: string
  placeholder?: string
}>()
</script>

<template>
  <FormField v-slot="{componentField, errorMessage}" :name="name">
    <FormItem>
      <FormControl>
        <Label :for="name">{{ label }}</Label>
        <Input
          :type="type"
          :placeholder="placeholder"
          v-bind="componentField"
          :class="errorMessage && 'ring-destructive ring-2 ring-offset-2 '" />
      </FormControl>
    </FormItem>
  </FormField>
</template>
