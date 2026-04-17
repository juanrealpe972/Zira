'use client'

import { ProfileHeader } from '@/components/users/profile/ProfileHeader'
import { ProfileInfo } from '@/components/users/profile/ProfileInfo'
import { CreatePostCard } from '@/components/users/profile/CreatePostCard'
import { PostList } from '@/components/users/profile/PostList'

import { useEffect, useState } from 'react'

import { User, getUserById } from '@/services/users.service'
import { Post } from '@/types/social'
import { use } from 'react'

const mockPosts: Post[] = [
    {
        id: 1,
        userId: 1,
        text: 'Primera publicación de ejemplo 🚀',
        image: 'https://picsum.photos/600/300',
        createdAt: '2026-04-10',
        likes: 12,
        comments: [
            { id: 1, user: 'Ana', text: 'Muy buen post 🔥' },
        ],
    },
]

function getTokenUserId(): number | null {
    if (typeof document === 'undefined') return null
    const match = document.cookie.match(/zira_access=([^;]+)/)
    if (!match) return null

    try {
        const payload = JSON.parse(atob(match[1].split('.')[1]))
        return payload.user_id
    } catch {
        return null
    }
}

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [user, setUser] = useState<User | null>(null)
    const [posts, setPosts] = useState<Post[]>(mockPosts)
    const [resolvedId, setResolvedId] = useState<number | null>(null)

    const [newPost, setNewPost] = useState('')
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        let idFinal: number | null = null

        if (id === 'me') {
            idFinal = getTokenUserId()
        } else {
            idFinal = Number(id)
        }

        if (!idFinal) return

        setResolvedId(idFinal)
        getUserById(idFinal).then(setUser)
    }, [id])

    const handleCreatePost = () => {
        if (!newPost || !resolvedId) return

        const post: Post = {
            id: Date.now(),
            userId: resolvedId,
            text: newPost,
            image: imagePreview,
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: [],
        }

        setPosts([post, ...posts])
        setNewPost('')
        setImagePreview(null)
    }

    if (!user) return <div className="p-6">Cargando perfil...</div>

    return (
        <div className="max-w-4xl mx-auto">
            <ProfileHeader />
            <ProfileInfo user={user} />

            <CreatePostCard
                newPost={newPost}
                setNewPost={setNewPost}
                handleCreatePost={handleCreatePost}
                setImagePreview={setImagePreview}
            />

            <PostList posts={posts} />
        </div>
    )
}