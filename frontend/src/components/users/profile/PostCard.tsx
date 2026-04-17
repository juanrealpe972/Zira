import { Card } from '@radix-ui/themes'
import { Post } from '@/types/social'

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">{post.createdAt}</p>

      <p className="mt-2">{post.text}</p>

      {post.image && (
        <img src={post.image} className="mt-3 rounded-lg" />
      )}

      <div className="flex gap-4 mt-3 text-sm">
        <button>❤️ {post.likes}</button>
        <button>💬 Comentar</button>
        <button>🔁 Compartir</button>
      </div>
    </Card>
  )
}