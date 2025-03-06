<script setup lang="ts">
import {reactive, watchEffect} from 'vue'
import {useRoute} from 'vue-router'

import IconImage from '@/components/IconImage.vue'
import {category} from '@/utils/constants/data.constants'
import {RecipeService} from '@/services'
import type {TRecipe} from '@/models'

const route = useRoute()

const recipe = reactive({} as TRecipe)

watchEffect(async () => {
  try {
    const data = await RecipeService.getOne(route.params.id as string)
    if (!data) throw new Error('No data')

    Object.assign(recipe, data)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <main>
    <h1 class="my-8 text-center text-4xl font-bold">{{ recipe?.title }}</h1>
    <div class="flex flex-col items-center gap-6">
      <p v-if="recipe?.description" class="text-center">{{ recipe?.description }}</p>
      <div class="flex w-full items-center justify-center gap-10">
        <div class="flex items-center gap-2" v-if="recipe?.category">
          <IconImage :type="recipe.category" :size="22" />
          <span>{{ category.find(c => c.type === recipe?.category)?.name }}</span>
        </div>
        <div v-if="recipe?.preparationTime" class="flex items-center gap-2">
          <IconImage type="clock" :size="22" />
          <span>{{ recipe?.preparationTime }}</span>
        </div>
        <div v-if="recipe?.cookingTime" class="flex items-center gap-2">
          <IconImage type="oven" :size="22" />
          <span>{{ recipe?.cookingTime }}</span>
        </div>
        <div v-if="recipe?.persNb" class="flex items-center gap-2">
          <IconImage type="users" :size="22" />
          <span>{{ recipe?.persNb }}</span>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        <span
          v-for="ingredient in recipe?.ingredients"
          :key="ingredient"
          class="rounded-md bg-muted px-2 py-1"
          >{{ ingredient }}</span
        >
      </div>
      <ol class="mt-4 list-decimal pl-8">
        <li v-for="step in recipe?.steps" :key="step" class="mb-2">{{ step }}</li>
      </ol>
    </div>
  </main>
</template>
