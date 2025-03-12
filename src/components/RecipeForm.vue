<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import {useForm} from 'vee-validate'
import {useQueryClient, useMutation, useQuery} from '@tanstack/vue-query'

import InputForm from './InputForm.vue'
import SelectForm from './SelectForm.vue'
import TimeInput from './TimeInput.vue'
import InputTags from './InputTags.vue'
// import ImageUploader from './ImageUploader.vue'

import {Button} from '@/components/ui/button'
import {category, recipeExample2} from '@/utils/constants/data.constants'
import {useAppStore} from '@/store/app.store'
import {recipeFormSchema} from '@/models/schemas/recipe.schemas'
import InputSteps from './InputSteps.vue'
import {RecipeService} from '@/services'
import type {TRecipe} from '@/models'

const {recipeId, dialogId} = defineProps<{
  recipeId?: string
  dialogId?: string
}>()

const appStore = useAppStore()

const queryClient = useQueryClient()

const {data: recipe} = useQuery({
  queryKey: ['recipes', recipeId],
  queryFn: () => RecipeService.getOne(recipeId as string),
  enabled: !!recipeId,
})

const createRecipe = useMutation({
  mutationFn: RecipeService.create,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['recipes']})
  },
})

const updateRecipe = useMutation({
  mutationFn: ({id, newRecipe}: {id: string; newRecipe: Partial<TRecipe>}) =>
    RecipeService.update(id, newRecipe),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['recipes', recipeId]})
  },
})

const formSchema = toTypedSchema(recipeFormSchema)

const form = useForm({
  validationSchema: formSchema,
  initialValues: recipe.value || recipeExample2, //|| {ingredients: [], steps: ['']},
})

const onSubmit = form.handleSubmit(values => {
  if (recipe.value) {
    updateRecipe.mutate({id: recipe.value.id, newRecipe: values})
  } else {
    createRecipe.mutate(values)
  }

  if (dialogId) {
    appStore.closeDialog(dialogId)
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <!-- <ImageUploader /> -->
    <InputForm type="text" name="title" placeholder="Titre" />
    <InputForm type="text" name="description" placeholder="Description" />
    <SelectForm name="category" placeholder="Catégorie" :list="category" withItemIcon />
    <InputTags name="ingredients" placeholder="Ingrédients" />
    <InputSteps name="steps" label="Étapes" placeholder="Saisir une étape" />

    <div class="flex items-end gap-2">
      <TimeInput iconName="clock" name="preparationTime" label="Préparation" />
      <TimeInput iconName="oven" name="cookingTime" label="Cuisson" />
      <InputForm type="number" name="persNb" placeholder="Nb de personne" />
    </div>
    <Button type="submit">{{ recipe ? 'Modifier' : 'Enregistrer' }}</Button>
  </form>
</template>
