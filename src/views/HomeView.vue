<script setup lang="ts">
import IconImage from '@/components/IconImage.vue'
import type {TRecipe} from '@/models'
import {RecipeService} from '@/services'
import {category} from '@/utils/constants/data.constants'
import {reactive, watchEffect} from 'vue'

const recipeList = reactive({data: [] as TRecipe[]})

watchEffect(async () => {
  try {
    const data = await RecipeService.getAll()
    if (!data) throw new Error('No data')

    recipeList.data = data
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <main class="h-[calc(100%-80px)]">
    <div class="flex h-14 justify-center">
      <h1 class="text-4xl font-bold">Recettes</h1>
    </div>
    <div
      class="grid h-[calc(100%-56px)] grid-cols-1 gap-4 overflow-auto py-4 md:grid-cols-2 lg:grid-cols-3">
      <button
        @click="() => $router.push(`/recipe/${recipe.id}`)"
        v-for="recipe in recipeList.data"
        :key="recipe.id"
        class="flex max-h-52 flex-col items-start justify-between gap-3 rounded-md border-2 border-border bg-white p-4 transition-colors hover:border-primary hover:bg-primary/10">
        <h2 class="text-xl font-bold">{{ recipe.title }}</h2>
        <p class="text-start">{{ recipe.description }}</p>
        <div class="flex items-center gap-2">
          <IconImage :type="recipe.category" :size="22" />
          <span>{{ category.find(c => c.type === recipe.category)?.name }}</span>
        </div>
        <div class="flex w-full items-center justify-between">
          <div v-if="recipe.preparationTime" class="flex items-center gap-2">
            <IconImage type="clock" :size="22" />
            <span>{{ recipe.preparationTime }}</span>
          </div>
          <div v-if="recipe.cookingTime" class="flex items-center gap-2">
            <IconImage type="oven" :size="22" />
            <span>{{ recipe.cookingTime }}</span>
          </div>
          <div v-if="recipe.persNb" class="flex items-center gap-2">
            <IconImage type="users" :size="22" />
            <span>{{ recipe.persNb }}</span>
          </div>
        </div>
      </button>
    </div>
  </main>
</template>
