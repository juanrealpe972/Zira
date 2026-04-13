export type Post = {
  id: number
  userId: number
  text: string
  image?: string | null
  createdAt: string
  likes: number
  comments: { id: number; user: string; text: string }[]
}