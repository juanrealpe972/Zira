import { Post } from '@/types/social'
import { PostCard } from './PostCard'

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="px-6 mt-6 space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}