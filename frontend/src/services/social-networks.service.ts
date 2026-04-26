import { apiDelete, ApiError, apiGet, apiPost, apiPut } from "@/lib/api-client"

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

const SocialNetwork_ENDPOINT = '/api/v1/social_networks'

export async function getSocialNetworks(userId: number): Promise<SocialNetwork[]> {
  try {
    return await apiGet<SocialNetwork[]>(`${SocialNetwork_ENDPOINT}?user=${userId}`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al obtener redes sociales')
    }
    throw error
  }
}

export async function createSocialNetwork(data: SocialNetworkRequest): Promise<SocialNetwork> {
  try {
    return await apiPost<SocialNetwork>(`${SocialNetwork_ENDPOINT}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      // console.error('ERROR REAL:', error)
      throw new Error('Error al crear red social')
    }
    throw error
  }
}

export async function updateSocialNetwork(id: number, data: Partial<SocialNetworkRequest>): Promise<SocialNetwork> {
  try {
    return await apiPut<SocialNetwork>(`${SocialNetwork_ENDPOINT}/${id}/`, data)
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      throw new Error('Error al actualizar red social')
    }
    throw error
  }
}

export async function deleteSocialNetwork(id: number): Promise<void> {
  try {
    return await apiDelete(`${SocialNetwork_ENDPOINT}/${id}/`)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw new Error('Red social no encontrada')
    }
    throw error
  }
}