<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import RecipeForm from './RecipeForm.vue'
import {Button} from '@/components/ui/button'

import DialogModal from './DialogModal.vue'
import IconImage from './IconImage.vue'
import {computed} from 'vue'
import {useAppStore} from '@/store/app.store'
import {useRecipeStore} from '@/store/recipe.store'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const recipeStore = useRecipeStore()

const recipeId = computed(() => route.params.id as string)

const goBack = () => {
  router.back()
}

const deleteRecipe = () => {
  recipeStore.deleteRecipe(recipeId.value)
  appStore.closeDialog('delete-recipe')
  goBack()
}
</script>

<template>
  <header class="flex h-20 w-full items-center">
    <div class="flex w-full items-center justify-end" v-if="route.name === 'home'">
      <DialogModal id="add-recipe" title="Ajouter une recette" trigger="Ajouter une recette">
        <RecipeForm dialog-id="add-recipe" />
      </DialogModal>
    </div>

    <div v-else-if="route.name === 'recipe'" class="flex w-full items-center justify-between">
      <Button variant="ghost" @click="goBack">
        <IconImage type="left" />
      </Button>
      <div class="flex items-center gap-2">
        <DialogModal
          id="udpate-recipe"
          title="Modifier la recette"
          icon-trigger="pencil"
          trigger-button-variant="ghost">
          <RecipeForm :recipe-id="recipeId" dialog-id="update-recipe" />
        </DialogModal>
        <DialogModal
          id="delete-recipe"
          title="Supprimer la recette"
          icon-trigger="trash"
          trigger-button-variant="ghost-destructive">
          <p>Êtes-vous sûr de vouloir supprimer cette recette ?</p>
          <div class="flex justify-end gap-4">
            <Button variant="ghost" @click="() => appStore.closeDialog('delete-recipe')"
              >Annuler</Button
            >
            <Button variant="destructive" @click="deleteRecipe">Supprimer</Button>
          </div>
        </DialogModal>
      </div>
    </div>
  </header>
</template>
