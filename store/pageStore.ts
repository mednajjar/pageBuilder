import { create } from 'zustand'
import { StateCreator } from 'zustand'

interface PageContent {
  id: string
  type: string
  content: any
}

interface PageStore {
  pageContent: PageContent[]
  pageTitle: string
  setPageContent: (content: PageContent[]) => void
  setPageTitle: (title: string) => void
}

const store: StateCreator<PageStore> = (set) => ({
  pageContent: [],
  pageTitle: '',
  setPageContent: (content: PageContent[]) => set({ pageContent: content }),
  setPageTitle: (title: string) => set({ pageTitle: title })
})

export const usePageStore = create<PageStore>(store) 