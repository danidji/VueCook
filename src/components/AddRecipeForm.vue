<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {useForm} from 'vee-validate'

import {Button} from '@/components/ui/button'
import {category} from '@/utils/data.constants'
import FormInput from './InputForm.vue'
import SelectForm from './SelectForm.vue'
import TextAreaForm from './TextAreaForm.vue'

const formSchema = toTypedSchema(
  z.object({
    title: z.string({required_error: 'Champs requis'}).min(2).max(50),
    description: z.string({required_error: 'Champs requis'}).min(2).max(500),
    category: z
      .string({required_error: 'Champs requis'})
      .refine(value => category.map(c => c.type).includes(value)),
    steps: z.string({required_error: 'Champs requis'}).min(2).max(2000),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(values => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <FormInput type="text" name="title" placeholder="Titre" />
    <FormInput type="text" name="description" placeholder="Description" />
    <SelectForm name="category" placeholder="Catégorie" :list="category" withItemIcon />
    <TextAreaForm name="steps" placeholder="Étapes" />
    <Button type="submit">Enregistrer</Button>
  </form>
</template>
