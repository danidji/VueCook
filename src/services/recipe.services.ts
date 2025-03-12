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

const create = async (recipe: Omit<TRecipe, 'id'>) => {
  const response = await fetcher.post<Omit<TRecipe, 'id'>, TRecipe>('/api/recipes', recipe)
  return response.data
}

const update = async (id: string, recipe: Partial<TRecipe>) => {
  const response = await fetcher.patch<Partial<TRecipe>, TRecipe>(`/api/recipes/${id}`, recipe)
  return response.data
}

const remove = async (id: string) => {
  const response = await fetcher.del(`/api/recipes/${id}`)
  return response.data
}

const RecipeService = {
  getAll,
  getOne,
  create,
  update,
  remove,
}

export default RecipeService
