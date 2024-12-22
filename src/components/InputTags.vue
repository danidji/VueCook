<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
const {name, placeholder, label} = defineProps<{
  name: string
  label?: string
  placeholder?: string
}>()
</script>

<template>
  <FormField :name="name" v-slot="{value}">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <TagsInput :model-value="value">
          <TagsInputItem v-for="item in value" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput :placeholder="placeholder" />
        </TagsInput>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
