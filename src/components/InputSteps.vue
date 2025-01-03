<script setup lang="ts">
import {useFieldArray} from 'vee-validate'
import Button from './ui/button/Button.vue'
import IconImage from './IconImage.vue'

// Props pour définir le nom du champ lié

const {name, label, placeholder} = defineProps<{
  name: string
  label?: string
  placeholder?: string
}>()

// Utiliser useFieldArray pour gérer la liste dynamique
const {fields, push, remove} = useFieldArray(name)

// Ajouter une étape
const addStep = () => {
  push('') // Ajouter une nouvelle étape vide
}

// Supprimer une étape
const removeStep = (index: number) => {
  remove(index)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="steps" class="text-sm"> {{ label }} </label>
    <div v-for="(step, index) in fields" :key="index" class="mb-2 flex items-center space-x-2">
      <span class="text-sm"> {{ index + 1 }}. </span>
      <input
        type="text"
        v-model="step.value"
        :name="`${name}[${index}]`"
        class="flex-1 outline-none"
        :placeholder="placeholder" />
      <Button v-if="index === fields.length - 1" type="button" @click="addStep" variant="ghost">
        <IconImage type="plus" />
      </Button>
      <Button
        type="button"
        v-if="fields.length > 1"
        @click="() => removeStep(index)"
        variant="ghost-destructive">
        <IconImage type="minus" />
      </Button>
    </div>
  </div>
</template>
