<script setup lang="ts">
import {FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form'
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
  <FormField v-slot="{componentField}" :name="name">
    <FormItem>
      <FormControl>
        <Label :for="name">{{ label }}</Label>
        <Input :type="type" :placeholder="placeholder" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
