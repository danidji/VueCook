import fetcher from './fetcher'

const getAll = async () => {
  const response = await fetcher.get('/api/recipes')
  return response
}

const getOne = async (id: string) => {
  const response = await fetcher.get(`/api/recipes/${id}`)
  return response
}

const RecipeService = {
  getAll,
  getOne,
}

export default RecipeService
