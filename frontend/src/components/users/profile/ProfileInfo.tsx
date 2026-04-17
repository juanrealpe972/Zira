import { Separator } from '@radix-ui/themes'
import { User } from '@/services/users.service'

export function ProfileInfo({ user }: { user: User }) {
  return (
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
  )
}