<script setup lang="ts">
import {reactive, ref, watch} from 'vue'
import {useField} from 'vee-validate'

import IconImage from './IconImage.vue'
import {cn} from '@/lib/utils'

type TTime = {
  h: number
  min: number
}

const {name, label, iconName} = defineProps<{
  name: string
  label?: string
  iconName?: string
}>()
const {value, handleChange} = useField(() => name, {defaultValue: '00:00'})

const time: TTime = reactive({
  h: value.value ? Number((value.value as string).split(':')[0]) : 0,
  min: value.value ? Number((value.value as string).split(':')[1]) : 0,
})

const parseZero = (value: number) => (value === 0 ? '00' : value)

watch(time, newValue => {
  handleChange(`${parseZero(newValue.h)}:${parseZero(newValue.min)}`)
})

const isFocus = ref(false)
</script>

<template>
  <div class="flex flex-col gap-2">
    <span v-if="label" class="text-sm">{{ label }}</span>
    <div
      :class="
        cn(
          'h-10 rounded-md border border-input px-3 py-2',
          isFocus && 'ring-2 ring-ring ring-offset-2',
        )
      ">
      <div class="flex items-center gap-1">
        <IconImage v-if="iconName" :type="iconName" :size="22" />
        <input
          type="number"
          min="00"
          max="23"
          step="1"
          class="w-10 text-right outline-none"
          :value="time.h"
          @input="event => (time.h = Number((event.target as HTMLInputElement).value))"
          @focus="isFocus = true"
          @blur="isFocus = false" />
        <span>h</span>
        <input
          type="number"
          min="00"
          max="59"
          step="1"
          class="w-10 text-right outline-none"
          :value="time.min"
          @input="event => (time.min = Number((event.target as HTMLInputElement).value))"
          @focus="isFocus = true"
          @blur="isFocus = false" />
      </div>
    </div>
  </div>
</template>
