import { Box, Flex, Text, Card, Heading, Separator, Avatar } from '@radix-ui/themes'
import { Icons } from '@/components/ui/icons/icons'
import { MockAbout, MockPost, mockSocial } from '@/data/profile.mock'
import { PostCard } from '../PostCard'
import { CreatePostCard } from '../CreatePostCard'
import { User } from '@/services/users.service'

type Props = {
  user: User
  about: MockAbout
  posts: MockPost[]
  newPost: string
  setNewPost: (v: string) => void
  imagePreview: string | null
  setImagePreview: (v: string | null) => void
  onCreatePost: () => void
}

export function ProfileTab({ user, about, posts, newPost, setNewPost, imagePreview, setImagePreview, onCreatePost }: Props) {
  return (
    <Flex gap="4" align="start">

      {/* Columna izquierda */}
      <Flex direction="column" gap="4" style={{ width: 280, flexShrink: 0 }}>

        {/* About */}
        <Card size="2">
          <Heading size="3" mb="3">Acerca de</Heading>
          <Text size="2" color="gray" style={{ lineHeight: 1.6, display: 'block', marginBottom: 12 }}>
            {user.description}
          </Text>
          <Flex direction="column" gap="2">
            {[
              { icon: Icons.archive, text: `Vive en ${user.city} - ${user.country}` },
              { icon: Icons.mail, text: user.email },
              { icon: Icons.task, text: `Trabaja en ${user.company}` },
            ].map(({ icon: Icon, text }, i) => (
              <Flex key={i} align="center" gap="2">
                <Icon width={14} height={14} style={{ color: 'var(--gray-9)', flexShrink: 0 }} />
                <Text size="2" color="gray">{text}</Text>
              </Flex>
            ))}
          </Flex>
        </Card>

        {/* Social */}
        <Card size="2">
          <Heading size="3" mb="3">Social</Heading>
          <Flex direction="column" gap="2">
            {Object.entries(mockSocial).map(([platform, url]) => (
              <Flex key={platform} align="center" gap="2">
                <Icons.share width={14} height={14} style={{ color: 'var(--accent-9)', flexShrink: 0 }} />
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Text size="2" style={{ color: 'var(--accent-9)' }}>{url}</Text>
                </a>
              </Flex>
            ))}
          </Flex>
        </Card>
      </Flex>

      {/* Columna derecha — posts */}
      <Flex direction="column" gap="4" style={{ flex: 1, minWidth: 0 }}>
        <CreatePostCard
          userName={user.name}
          userPhoto={user.photo}
          newPost={newPost}
          setNewPost={setNewPost}
          handleCreatePost={onCreatePost}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
        />
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>
    </Flex>
  )
}