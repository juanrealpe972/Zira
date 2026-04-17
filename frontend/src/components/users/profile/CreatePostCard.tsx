import { Card } from '@radix-ui/themes'

export function CreatePostCard({
  newPost,
  setNewPost,
  handleCreatePost,
  setImagePreview
}: any) {
  return (
    <div className="px-6">
      <Card className="p-4 border rounded-xl shadow-sm">
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-1 rounded-md"
          >
            Publicar
          </button>
        </div>
      </Card>
    </div>
  )
}