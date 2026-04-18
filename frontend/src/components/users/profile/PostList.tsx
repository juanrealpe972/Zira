import { Box, Flex, Text } from '@radix-ui/themes'
import { Post } from '@/types/social'
import { PostCard } from './PostCard'
import { Icons } from '@/components/ui/icons/icons'

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="2"
        py="9"
        px="6"
      >
        <Icons.content width={40} height={40} style={{ color: 'var(--gray-6)' }} />
        <Text size="3" weight="medium" color="gray">Sin publicaciones</Text>
        <Text size="2" color="gray">Aún no hay publicaciones para mostrar</Text>
      </Flex>
    )
  }

  return (
    <Box px="6" mt="4">
      <Flex direction="column" gap="4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>
    </Box>
  )
}