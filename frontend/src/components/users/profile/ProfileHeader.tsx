import { AvatarIcon } from '@radix-ui/react-icons'

export function ProfileHeader() {
  return (
    <div className="relative h-48 bg-linear-to-r from-purple-500 to-blue-500 rounded-b-2xl">
      <div className="absolute -bottom-10 left-6">
        <AvatarIcon className="w-24 h-24 rounded-full border-4 border-white" />
      </div>
    </div>
  )
}