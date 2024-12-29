<script setup lang="ts">
import {useRecipeStore} from '@/store/recipe.store'
import {storeToRefs} from 'pinia'
import {useRoute} from 'vue-router'

const route = useRoute()
const recipeStore = useRecipeStore()
const {getRecipeById} = storeToRefs(recipeStore)

const recipe = getRecipeById.value(route.params.id as string)
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold text-center my-8">{{ recipe?.title }}</h1>
    <p>{{ recipe?.description }}</p>
    <p>{{ recipe?.steps }}</p>
  </main>
</template>
