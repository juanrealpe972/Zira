'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import { Box, Flex, Spinner, Text } from '@radix-ui/themes'
import { User, getUserById } from '@/services/users.service'
import { ProfileHeader } from '@/components/users/profile/ProfileHeader'
import { ProfileTab } from '@/components/users/profile/tabs/ProfileTab'
import { FollowersTab } from '@/components/users/profile/tabs/FollowersTab'
import { FriendsTab } from '@/components/users/profile/tabs/FriendsTab'
import { GalleryTab } from '@/components/users/profile/tabs/GalleryTab'
import {
  mockPosts, mockFollowers, mockFriends,
  mockGallery, mockAbout, MockPost,
} from '@/data/profile.mock'

type Tab = 'profile' | 'followers' | 'friends' | 'gallery'

function getTokenUserId(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  if (!match) return null
  try {
    const payload = JSON.parse(atob(match[1].split('.')[1]))
    return payload.user_id
  } catch { return null }
}

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [posts, setPosts] = useState<MockPost[]>(mockPosts)
  const [newPost, setNewPost] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [viewerId, setViewerId] = useState<number | null>(null)

  useEffect(() => {
    const id = getTokenUserId()
    setViewerId(id)
  }, [])


  useEffect(() => {
    const idFinal = id === 'me' ? getTokenUserId() : Number(id)
    if (!idFinal) return
    getUserById(idFinal).then(setUser).finally(() => setLoading(false))
  }, [id])

  function handleCreatePost() {
    if (!newPost.trim()) return
    const post: MockPost = {
      id: Date.now(),
      userId: Number(id),
      userName: user?.name ?? 'Usuario',
      userPhoto: user?.photo ?? null,
      text: newPost,
      image: imagePreview,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: [],
    }
    setPosts(prev => [post, ...prev])
    setNewPost('')
    setImagePreview(null)
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }} gap="2">
        <Spinner /><Text color="gray">Cargando perfil...</Text>
      </Flex>
    )
  }

  if (!user) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: '60vh' }}>
        <Text color="gray">No se encontró el usuario</Text>
      </Flex>
    )
  }

  return (
    <Box p="5" style={{ maxWidth: 960, margin: '0 auto' }}>

      {/* Breadcrumb */}
      <Flex align="center" gap="1" mb="4">
        <Text size="1" color="gray">Dashboard</Text>
        <Text size="1" color="gray">•</Text>
        <Text size="1" color="gray">Usuario</Text>
        <Text size="1" color="gray">•</Text>
        <Text size="1">{user.name}</Text>
      </Flex>

      {/* Header con tabs */}
      <ProfileHeader
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Contenido según tab */}
      {activeTab === 'profile' && (
        <ProfileTab
          user={user}
          viewerId={viewerId}
          posts={posts}
          newPost={newPost}
          setNewPost={setNewPost}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          onCreatePost={handleCreatePost}
        />
      )}
      {activeTab === 'followers' && <FollowersTab followers={mockFollowers} />}
      {activeTab === 'friends' && <FriendsTab friends={mockFriends} />}
      {activeTab === 'gallery' && <GalleryTab gallery={mockGallery} />}

    </Box>
  )
}