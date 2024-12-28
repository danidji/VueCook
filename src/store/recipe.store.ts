import type {TRecipe} from '@/models'
import {recipeData} from '@/utils/constants/data.constants'
import {defineStore} from 'pinia'

type TRecipeStore = {
  recipes: TRecipe[]
}

export const useRecipeStore = defineStore('recipe', {
  state: (): TRecipeStore => ({
    recipes: recipeData,
  }),
  actions: {
    addRecipe(data: TRecipe) {
      this.recipes.push(data)
    },
  },
})
