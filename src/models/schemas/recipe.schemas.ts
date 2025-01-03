import {category} from '@/utils/constants/data.constants'
import {z} from 'zod'

export const recipeFormSchema = z.object({
  title: z.string({required_error: 'Champs requis'}).min(2).max(50),
  description: z.string().optional(),
  category: z
    .string({required_error: 'Champs requis'})
    .refine(value => category.map(c => c.type).includes(value)),
  steps: z
    .array(z.string({required_error: 'Champs requis'}))
    .min(1)
    .max(50),
  ingredients: z
    .array(z.string({required_error: 'Champs requis'}))
    .min(1)
    .max(50),
  preparationTime: z.string().optional(),
  cookingTime: z.string().optional(),
  persNb: z.number().optional(),
})
