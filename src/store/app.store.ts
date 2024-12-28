import {defineStore} from 'pinia'

type TAppStore = {
  isOpenDialog: boolean
}

export const useAppStore = defineStore('app', {
  state: (): TAppStore => ({
    isOpenDialog: false,
  }),
  actions: {
    closeDialog() {
      this.isOpenDialog = false
    },
  },
})
