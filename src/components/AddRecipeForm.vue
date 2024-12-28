<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {useForm} from 'vee-validate'

import {Button} from '@/components/ui/button'
import {category} from '@/utils/constants/data.constants'
import InputForm from './InputForm.vue'
import SelectForm from './SelectForm.vue'
import TextAreaForm from './TextAreaForm.vue'
import TimeInput from './TimeInput.vue'
import InputTags from './InputTags.vue'
import {useRecipeStore} from '@/store/recipe.store'
import {generateUniqueId} from '@/utils/functions/general.functions'
import {useAppStore} from '@/store/app.store'
// import ImageUploader from './ImageUploader.vue'

const recipeStore = useRecipeStore()
const appStore = useAppStore()

const formSchema = toTypedSchema(
  z.object({
    title: z.string({required_error: 'Champs requis'}).min(2).max(50),
    description: z.string().optional(),
    category: z
      .string({required_error: 'Champs requis'})
      .refine(value => category.map(c => c.type).includes(value)),
    steps: z.string({required_error: 'Champs requis'}).min(2).max(2000),
    ingredients: z
      .array(z.string({required_error: 'Champs requis'}))
      .min(1)
      .max(50),
    preparationTime: z.string().optional(),
    cookingTime: z.string().optional(),
    persNb: z.number().optional(),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: 'Kimchi',
    category: 'asian',
    steps:
      "Couper le choix à la base et séparant de délicatement sans déchirer les feuilles\n\nEnlever la base et couper des bouts d'environ environ 5cm\n\nSaler abondamment, et laisser reposer au moins 12h mélanger au fur et à mesure\n\nDétailler les carottes et le blanc en julienne\n\nCouper la base des oignons nouveaux et les réserver pour la pâte de piment\n\nPour la pate de piment :  mixer le piment, le gingembre, l’ail, la base des oignon nouveau, la poire, une cuillère à soupe de sauce huître et une cuillère à soupe de sauce poisson\n\nRincer abondamment le choux \n\nMélanger le choux les légumes et la pate de piment\n\nMettre dans un bocal hermétique et laisser faire monter pendant une semaine",
    ingredients: [
      'piment gochugaru (50gr)',
      'ail',
      'gingembre',
      'carotte',
      'cebette',
      'radis blanc',
      'sauce poisson',
      'sauce huitre',
      'poire bien mûre',
      'choux chinois',
    ],
    preparationTime: '13:0',
  },
})

const onSubmit = form.handleSubmit(values => {
  recipeStore.addRecipe({
    id: generateUniqueId(8),
    ...values,
  })

  appStore.closeDialog()
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <!-- <ImageUploader /> -->
    <InputForm type="text" name="title" placeholder="Titre" />
    <InputForm type="text" name="description" placeholder="Description" />
    <SelectForm name="category" placeholder="Catégorie" :list="category" withItemIcon />
    <InputTags name="ingredients" placeholder="Ingrédients" />
    <TextAreaForm name="steps" placeholder="Étapes" />

    <div class="flex items-end gap-2">
      <TimeInput iconName="clock" name="preparationTime" label="Préparation" />
      <TimeInput iconName="oven" name="cookingTime" label="Cuisson" />
      <InputForm type="number" name="persNb" placeholder="Nb de personne" />
    </div>
    <Button type="submit">Enregistrer</Button>
  </form>
</template>
