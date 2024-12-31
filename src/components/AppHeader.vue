<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import RecipeForm from './RecipeForm.vue'
import {Button} from '@/components/ui/button'

import DialogModal from './DialogModal.vue'
import IconImage from './IconImage.vue'

const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <header class="flex h-20 w-full items-center">
    <div class="flex w-full items-center justify-end" v-if="route.name === 'home'">
      <DialogModal title="Ajouter une recette" trigger="Ajouter une recette">
        <RecipeForm />
      </DialogModal>
    </div>

    <div v-else-if="route.name === 'recipe'" class="flex w-full items-center justify-between">
      <Button variant="ghost" @click="goBack">
        <IconImage type="left" />
      </Button>
      <div class="flex items-center gap-2">
        <DialogModal
          title="Modifier la recette"
          icon-trigger="pencil"
          trigger-button-variant="ghost">
          <p>Formulaire de modification ici</p>
        </DialogModal>
        <Button variant="ghost-destructive" @click="() => console.log('supprimer la recette')">
          <IconImage type="trash" />
        </Button>
      </div>
    </div>
  </header>
</template>
