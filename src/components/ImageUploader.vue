<script setup lang="ts">
import {ref} from 'vue'
import IconImage from './IconImage.vue'

const image = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const reader = new FileReader()
    reader.onload = () => {
      image.value = reader.result as string
    }
    reader.readAsDataURL(target.files[0])
  }
}
</script>

<template>
  <div class="flex items-center">
    <div
      class="relative w-40 h-40 rounded-md overflow-hidden border border-input cursor-pointer"
      @click="triggerFileInput">
      <input
        type="file"
        accept="image/*"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange" />
      <div
        v-if="image"
        class="w-full h-full bg-cover bg-center"
        :style="{backgroundImage: `url(${image})`}"></div>
      <div v-else class="flex items-center justify-center w-full h-full text-gray-500">
        <IconImage type="upload" :size="24" />
      </div>
    </div>
  </div>
</template>
