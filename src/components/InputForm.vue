<script setup lang="ts">
import {FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'

const {name, type, placeholder} = defineProps<{
  name: string
  type?: string
  placeholder?: string
}>()
</script>

<template>
  <FormField v-slot="{componentField}" :name="name">
    <FormItem>
      <FormControl>
        <Input :type="type" :placeholder="placeholder" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
