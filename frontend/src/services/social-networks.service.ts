const API_URL = process.env.NEXT_PUBLIC_API_URL

function getToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  return match ? match[1] : null
}

export type SocialNetwork = {
  id: number
  user: number
  platform: string
  url: string
  username: string
}

export type SocialNetworkRequest = {
  user: number
  platform: string
  url: string
  username: string
}

export async function getSocialNetworks(userId: number): Promise<SocialNetwork[]> {
  const token = getToken()
  const response = await fetch(`${API_URL}/api/v1/social_networks/?user=${userId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Error al obtener redes sociales')
  return response.json()
}

export async function createSocialNetwork(data: SocialNetworkRequest): Promise<SocialNetwork> {
  const token = getToken()
  const response = await fetch(`${API_URL}/api/v1/social_networks/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.detail ?? 'Error al crear red social')
  }
  return response.json()
}

export async function updateSocialNetwork(id: number, data: Partial<SocialNetworkRequest>): Promise<SocialNetwork> {
  const token = getToken()
  const response = await fetch(`${API_URL}/api/v1/social_networks/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error?.detail ?? 'Error al actualizar red social')
  }
  return response.json()
}

export async function deleteSocialNetwork(id: number): Promise<void> {
  const token = getToken()
  const response = await fetch(`${API_URL}/api/v1/social_networks/${id}/`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Error al eliminar red social')
}