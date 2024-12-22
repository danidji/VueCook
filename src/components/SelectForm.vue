<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {FormControl, FormField, FormItem} from '@/components/ui/form'
import type {TCategory} from '@/models'
import IconImage from './IconImage.vue'

const {
  name,
  placeholder,
  list,
  withItemIcon = false,
} = defineProps<{
  name: string
  placeholder: string
  list: TCategory[]
  withItemIcon?: boolean
}>()
</script>

<template>
  <FormField v-slot="{componentField, errorMessage}" :name="name">
    <FormItem>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger :class="errorMessage && 'ring-destructive ring-2 ring-offset-2 '">
            <SelectValue :placeholder="placeholder" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="item in list" :value="item.type" :key="item.type">
              <span class="flex flex-row gap-5 items-center">
                <IconImage v-if="withItemIcon" :type="item.type" :size="20" />
                <span class="text-base">
                  {{ item.name }}
                </span>
              </span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>
