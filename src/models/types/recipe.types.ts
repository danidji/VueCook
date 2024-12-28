export type TCategory = {
  type: string
  name: string
}

export type TRecipe = {
  id: string
  title: string
  description?: string
  category: string
  ingredients: string[]
  steps: string
  preparationTime?: string
  cookingTime?: string
  persNb?: number
}
