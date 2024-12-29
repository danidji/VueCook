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
  getters: {
    getRecipeById: state => (id: string) => {
      return state.recipes.find(recipe => recipe.id === id)
    },
  },
  actions: {
    addRecipe(data: TRecipe) {
      this.recipes.push(data)
    },
  },
})
