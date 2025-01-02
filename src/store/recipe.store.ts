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
    updateRecipe(data: TRecipe) {
      const index = this.recipes.findIndex(recipe => recipe.id === data.id)
      this.recipes[index] = data
    },
    deleteRecipe(id: string) {
      const index = this.recipes.findIndex(recipe => recipe.id === id)
      this.recipes.splice(index, 1)
    },
  },
})
