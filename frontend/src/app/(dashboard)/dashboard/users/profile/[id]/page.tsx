'use client'

import { useEffect, useState } from 'react'
import {
    Box, Flex, Heading, Text, Card, Badge, Avatar,
    TextField, Select, DropdownMenu, IconButton,
    Checkbox, Button, Separator, TextArea
} from '@radix-ui/themes'

import { User } from '@/services/users.service'
import { Post } from '@/types/social'
import { AvatarIcon } from '@radix-ui/react-icons'

import { use } from 'react'

type Props = {
    params: Promise<{ id: string }>
}

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

export default function UserProfilePage({ params }: Props) {
    const { id } = use(params)
    const [user, setUser] = useState<User | null>(null)
    const [posts, setPosts] = useState<Post[]>(mockPosts)

    const [newPost, setNewPost] = useState('')
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        // Simulación de fetch (luego lo conectas a tu API)
        setUser({
            id: Number(id),
            name: 'Juan Camilo Realpe',
            email: 'test@email.com',
            phone: null,
            phone_prefix: null,
            national_id: null,
            address: 'Colombia',
            company: null,
            role: 'user',
            country: 'Colombia',
            city: 'Pitalito',
            photo: 'https://i.pravatar.cc/150?img=12',
            verified: true,
            created_at: '',
            is_active: true,
            is_staff: false,
        })
    }, [id])

    const handleCreatePost = () => {
        if (!newPost) return

        const post: Post = {
            id: Date.now(),
            userId: Number(id),
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
            {/* HEADER */}
            <div className="relative h-48 bg-linear-to-r from-purple-500 to-blue-500 rounded-b-2xl">
                <div className="absolute -bottom-10 left-6">
                    <AvatarIcon className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                    </AvatarIcon>
                </div>
            </div>

            {/* INFO */}
            <div className="mt-14 px-6">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">
                    📍 {user.city} - {user.country}
                </p>

                <div className="flex gap-6 mt-4 text-sm">
                    <span><b>120</b> seguidores</span>
                    <span><b>80</b> seguidos</span>
                    <span><b>25</b> posts</span>
                </div>

                <Separator className="my-6 h-px bg-gray-200" />
            </div>

            {/* CREAR POST */}
            <div className="px-6">
                <Card className="p-4 border rounded-xl">
                    <textarea
                        className="w-full p-2 border rounded-md"
                        placeholder="¿Qué estás pensando?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    />

                    <div className="flex justify-between mt-3">
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) setImagePreview(URL.createObjectURL(file))
                            }}
                        />

                        <button
                            onClick={handleCreatePost}
                            className="bg-blue-600 text-white px-4 py-1 rounded-md"
                        >
                            Publicar
                        </button>
                    </div>
                </Card>
            </div>

            {/* POSTS */}
            <div className="px-6 mt-6 space-y-4">
                {posts.map((post) => (
                    <Card key={post.id} className="p-4 border rounded-xl">
                        <p className="text-sm text-gray-500">{post.createdAt}</p>

                        <p className="mt-2">{post.text}</p>

                        {post.image && (
                            <img
                                src={post.image}
                                className="mt-3 rounded-lg"
                            />
                        )}

                        {/* acciones */}
                        <div className="flex gap-4 mt-3 text-sm">
                            <button>❤️ {post.likes}</button>
                            <button>💬 Comentar</button>
                            <button>🔁 Compartir</button>
                        </div>

                        {/* comentarios */}
                        <div className="mt-3 space-y-2">
                            {post.comments.map((c) => (
                                <div key={c.id} className="text-sm bg-gray-100 p-2 rounded">
                                    <b>{c.user}:</b> {c.text}
                                </div>
                            ))}
                        </div>

                        {/* input comentario */}
                        <div className="mt-3 flex gap-2">
                            <input
                                className="border p-1 flex-1 rounded"
                                placeholder="Escribe un comentario..."
                            />
                            <button className="px-3 bg-gray-800 text-white rounded">
                                Enviar
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}