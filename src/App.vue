<script setup lang="ts">
import {RouterView} from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="w-full h-full px-28">
    <AppHeader />

    <RouterView />
  </div>
</template>
