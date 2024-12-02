<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {useForm} from 'vee-validate'
import {FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Icon from './IconImage.vue'

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
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
    <FormField v-slot="{componentField}" name="title">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Titre" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{componentField}" name="description">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Description" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Enregistrer</Button>
  </form>
</template>
