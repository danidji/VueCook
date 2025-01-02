<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import {useForm} from 'vee-validate'
import {storeToRefs} from 'pinia'
import {computed} from 'vue'

import InputForm from './InputForm.vue'
import SelectForm from './SelectForm.vue'
import TextAreaForm from './TextAreaForm.vue'
import TimeInput from './TimeInput.vue'
import InputTags from './InputTags.vue'
// import ImageUploader from './ImageUploader.vue'

import {Button} from '@/components/ui/button'
import {category, recipeExample} from '@/utils/constants/data.constants'
import {useRecipeStore} from '@/store/recipe.store'
import {useAppStore} from '@/store/app.store'
import {recipeFormSchema} from '@/models/schemas/recipe.schemas'

const {recipeId, dialogId} = defineProps<{
  recipeId?: string
  dialogId?: string
}>()

const recipeStore = useRecipeStore()
const appStore = useAppStore()

const {getRecipeById} = storeToRefs(recipeStore)
const recipe = computed(() => (recipeId ? getRecipeById.value(recipeId) : null))

const formSchema = toTypedSchema(recipeFormSchema)

const form = useForm({
  validationSchema: formSchema,
  initialValues: recipe.value || recipeExample, //||{ingredients: []},
})

const onSubmit = form.handleSubmit(values => {
  if (recipe.value) {
    recipeStore.updateRecipe({
      id: recipe.value.id,
      ...values,
    })
  } else {
    recipeStore.addRecipe({
      id: values.title.split(' ').join('-').toLowerCase(),
      ...values,
    })
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
    <TextAreaForm name="steps" placeholder="Étapes" />

    <div class="flex items-end gap-2">
      <TimeInput iconName="clock" name="preparationTime" label="Préparation" />
      <TimeInput iconName="oven" name="cookingTime" label="Cuisson" />
      <InputForm type="number" name="persNb" placeholder="Nb de personne" />
    </div>
    <Button type="submit">{{ recipe ? 'Modifier' : 'Enregistrer' }}</Button>
  </form>
</template>
