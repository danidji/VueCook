import type {TRecipe} from '@/models'
import fetcher from './fetcher'

const getAll = async () => {
  const response = await fetcher.get<TRecipe[]>('/api/recipes')
  return response.data
}

const getOne = async (id: string) => {
  const response = await fetcher.get<TRecipe>(`/api/recipes/${id}`)
  return response.data
}

const create = async (recipe: TRecipe) => {
  const response = await fetcher.post<Omit<TRecipe, 'id'>, TRecipe>('/api/recipes', recipe)
  return response.data
}

const RecipeService = {
  getAll,
  getOne,
  create,
}

export default RecipeService
