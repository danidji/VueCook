<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import AddRecipeForm from './AddRecipeForm.vue'
import DialogModal from './DialogModal.vue'

const route = useRoute()
const router = useRouter()

// Fonction pour revenir en arrière
const goBack = () => {
  router.back()
}

console.log('route', route.name)
</script>

<template>
  <header>
    <div class="h-20 w-full flex items-center justify-end" v-if="route.name === 'home'">
      <DialogModal title="Ajouter une recette" trigger="Ajouter une recette">
        <AddRecipeForm />
      </DialogModal>
    </div>

    <div v-else-if="route.name === 'recipe'">
      <button class="mr-4 px-4 py-2 bg-blue-500 text-white rounded" @click="goBack">Retour</button>
      <DialogModal title="Modifier la recette" trigger="Modifier la recette">
        <p>Formulaire de modification ici</p>
      </DialogModal>
      <button
        class="ml-4 px-4 py-2 bg-red-500 text-white rounded"
        @click="() => console.log('Supprimer la recette')">
        Supprimer
      </button>
    </div>
  </header>
</template>
