export type MockPost = {
  id: number
  userId: number
  userName: string
  userPhoto: string | null
  text: string
  image: string | null
  createdAt: string
  likes: number
  likedBy: { id: number; photo: string | null }[]
  comments: { id: number; user: string; userPhoto: string | null; text: string; createdAt: string }[]
}

export type MockFollower = {
  id: number
  name: string
  photo: string | null
  location: string
  role: string
  isFollowing: boolean
}

export type MockFriend = {
  id: number
  name: string
  photo: string | null
  job: string
  company: string
  social: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
}

export type MockGalleryItem = {
  id: number
  url: string
  caption?: string
}

export type MockAbout = {
  bio: string
  location: string
  email: string
  job: string
  company: string
  studied: string
}

export const mockAbout: MockAbout = {
  bio: 'Desarrollador apasionado por crear experiencias digitales únicas. Amante del café y el código limpio.',
  location: 'Colombia',
  email: 'juan@zira.cc',
  job: 'CTO',
  company: 'Zira Inc.',
  studied: 'Universidad Nacional',
}

export const mockSocial = {
  facebook: 'https://facebook.com/juanrealpe',
  instagram: 'https://instagram.com/juanrealpe',
  linkedin: 'https://linkedin.com/in/juanrealpe',
  twitter: 'https://twitter.com/juanrealpe',
}

export const mockPosts: MockPost[] = [
  {
    id: 1,
    userId: 1,
    userName: 'Juan Realpe',
    userPhoto: null,
    text: 'El sol lentamente se puso sobre el horizonte, pintando el cielo con tonos vibrantes de naranja y rosa. 🌅',
    image: 'https://picsum.photos/800/400?random=1',
    createdAt: '2026-04-18T10:30:00Z',
    likes: 20,
    likedBy: [
      { id: 2, photo: 'https://i.pravatar.cc/32?img=1' },
      { id: 3, photo: 'https://i.pravatar.cc/32?img=2' },
      { id: 4, photo: 'https://i.pravatar.cc/32?img=3' },
    ],
    comments: [
      { id: 1, user: 'Ana García', userPhoto: 'https://i.pravatar.cc/32?img=5', text: 'Hermosa foto 😍', createdAt: '2026-04-18T11:00:00Z' },
      { id: 2, user: 'Carlos López', userPhoto: 'https://i.pravatar.cc/32?img=6', text: 'Increíble lugar!', createdAt: '2026-04-17T09:00:00Z' },
    ],
  },
  {
    id: 2,
    userId: 1,
    userName: 'Juan Realpe',
    userPhoto: null,
    text: 'Trabajando en el nuevo módulo de usuarios para Zira. El progreso es increíble 🚀',
    image: null,
    createdAt: '2026-04-15T08:00:00Z',
    likes: 15,
    likedBy: [
      { id: 5, photo: 'https://i.pravatar.cc/32?img=7' },
    ],
    comments: [],
  },
]

export const mockFollowers: MockFollower[] = [
  { id: 1, name: 'Ana García', photo: 'https://i.pravatar.cc/150?img=5', location: 'Bogotá, Colombia', role: 'Editor', isFollowing: true },
  { id: 2, name: 'Carlos López', photo: 'https://i.pravatar.cc/150?img=6', location: 'Medellín, Colombia', role: 'Admin', isFollowing: false },
  { id: 3, name: 'María Torres', photo: 'https://i.pravatar.cc/150?img=9', location: 'Cali, Colombia', role: 'User', isFollowing: true },
  { id: 4, name: 'Pedro Ramírez', photo: 'https://i.pravatar.cc/150?img=12', location: 'Cartagena, Colombia', role: 'Editor', isFollowing: false },
]

export const mockFriends: MockFriend[] = [
  {
    id: 1,
    name: 'Ana García',
    photo: 'https://i.pravatar.cc/150?img=5',
    job: 'Frontend Developer',
    company: 'Tech Corp',
    social: { facebook: 'https://facebook.com/ana', instagram: 'https://instagram.com/ana', linkedin: 'https://linkedin.com/in/ana' },
  },
  {
    id: 2,
    name: 'Carlos López',
    photo: 'https://i.pravatar.cc/150?img=6',
    job: 'Backend Developer',
    company: 'Zira Inc.',
    social: { twitter: 'https://twitter.com/carlos', linkedin: 'https://linkedin.com/in/carlos' },
  },
  {
    id: 3,
    name: 'María Torres',
    photo: 'https://i.pravatar.cc/150?img=9',
    job: 'UI/UX Designer',
    company: 'Creative Studio',
    social: { instagram: 'https://instagram.com/maria', linkedin: 'https://linkedin.com/in/maria' },
  },
]

export const mockGallery: MockGalleryItem[] = [
  { id: 1, url: 'https://picsum.photos/400/400?random=10', caption: 'Tarde en la ciudad' },
  { id: 2, url: 'https://picsum.photos/400/400?random=20', caption: 'Naturaleza' },
  { id: 3, url: 'https://picsum.photos/400/400?random=30', caption: 'Trabajo en equipo' },
  { id: 4, url: 'https://picsum.photos/400/400?random=40', caption: 'Café y código' },
  { id: 5, url: 'https://picsum.photos/400/400?random=50', caption: 'Atardecer' },
  { id: 6, url: 'https://picsum.photos/400/400?random=60', caption: 'Montañas' },
  { id: 7, url: 'https://picsum.photos/400/400?random=70' },
  { id: 8, url: 'https://picsum.photos/400/400?random=80' },
  { id: 9, url: 'https://picsum.photos/400/400?random=90' },
]