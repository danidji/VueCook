import {defineStore} from 'pinia'

type TAppStore = {
  dialogs: Record<string, boolean>
}

export const useAppStore = defineStore('app', {
  state: (): TAppStore => ({
    dialogs: {},
  }),
  actions: {
    closeDialog(id: string) {
      this.dialogs[id] = false
    },
  },
})
