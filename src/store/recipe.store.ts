import type {TRecipe} from '@/models'
import {defineStore} from 'pinia'

type TRecipeStore = {
  recipes: TRecipe[]
}

export const useRecipeStore = defineStore('recipe', {
  state: (): TRecipeStore => ({
    recipes: [],
  }),
  actions: {
    addRecipe(data: TRecipe) {
      this.recipes.push(data)
    },
  },
})
