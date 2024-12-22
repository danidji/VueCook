<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {useForm} from 'vee-validate'

import {Button} from '@/components/ui/button'
import {category} from '@/utils/data.constants'
import InputForm from './InputForm.vue'
import SelectForm from './SelectForm.vue'
import TextAreaForm from './TextAreaForm.vue'
import TimeInput from './TimeInput.vue'
import InputTags from './InputTags.vue'

const formSchema = toTypedSchema(
  z.object({
    title: z.string({required_error: 'Champs requis'}).min(2).max(50),
    description: z.string({required_error: 'Champs requis'}).min(2).max(500),
    category: z
      .string({required_error: 'Champs requis'})
      .refine(value => category.map(c => c.type).includes(value)),
    steps: z.string({required_error: 'Champs requis'}).min(2).max(2000),
    ingredients: z.array(z.string()).min(1).max(50),
    preparationTime: z.string().optional(),
    cookingTime: z.string().optional(),
    persNb: z.number().optional(),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    description: '',
    category: '',
    steps: '',
    ingredients: [],
    preparationTime: '',
    cookingTime: '',
    persNb: 0,
  },
})

const onSubmit = form.handleSubmit(values => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <InputForm type="text" name="title" placeholder="Titre" />
    <InputForm type="text" name="description" placeholder="Description" />
    <SelectForm name="category" placeholder="Catégorie" :list="category" withItemIcon />
    <InputTags name="ingredients" placeholder="Ingrédients" />
    <TextAreaForm name="steps" placeholder="Étapes" />

    <div class="flex items-end justify-between gap-2">
      <TimeInput iconName="clock" name="preparationTime" label="Préparation" />
      <TimeInput iconName="oven" name="preparationTime" label="Cuisson" />
      <InputForm type="number" name="persNb" placeholder="Nb de personne" />
    </div>
    <Button type="submit">Enregistrer</Button>
  </form>
</template>
