<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form'
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
  <FormField :name="name" v-slot="{value, errorMessage}">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <TagsInput
          :model-value="value"
          :class="errorMessage && 'ring-destructive ring-2 ring-offset-2 '">
          <TagsInputItem v-for="item in value" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput :placeholder="placeholder" />
        </TagsInput>
      </FormControl>
    </FormItem>
  </FormField>
</template>
