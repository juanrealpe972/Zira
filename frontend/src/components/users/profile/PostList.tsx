import { Box, Flex, Text } from '@radix-ui/themes'
import { MockPost } from '@/data/profile.mock'
import { PostCard } from './PostCard'
import { Icons } from '@/components/ui'

export function PostList({ posts }: { posts: MockPost[] }) {
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