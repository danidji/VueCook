<script setup lang="ts">
import {useRecipeStore} from '@/store/recipe.store'

const recipeStore = useRecipeStore()
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold text-center my-8">Recettes</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="recipe in recipeStore.recipes"
        :key="recipe.id"
        class="bg-white shadow-md rounded-md p-4">
        <h2 class="text-xl font-bold">{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
      </div>
    </div>
  </main>
</template>
