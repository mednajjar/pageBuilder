export interface Page {
  id: string
  title: string
  name: string
  content: any[]
}

// In-memory storage for demo purposes
export let pages: Page[] = [
  {
    id: 'page-1',
    title: 'Welcome Page',
    name: 'Welcome',
    content: []
  }
] 