<script setup lang="ts">
import {RouterView} from 'vue-router'
import Modal from './components/Modal.vue'
import AddRecipeForm from './components/AddRecipeForm.vue'
</script>

<template>
  <div class="w-full h-full px-28">
    <header>
      <div class="h-20 w-full flex items-center justify-end">
        <Modal title="Ajouter une recette" trigger="Ajouter une recette">
          <AddRecipeForm />
        </Modal>
      </div>
    </header>

    <RouterView />
  </div>
</template>
