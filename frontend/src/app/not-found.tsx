'use client'

import { Flex, Heading, Text, Button } from '@radix-ui/themes'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function getUserIdFromToken(): number | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  if (!match) return null
  try {
    return JSON.parse(atob(match[1].split('.')[1])).user_id
  } catch { return null }
}

export default function NotFound() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const userId = getUserIdFromToken()
    setIsLoggedIn(!!userId)
  }, [])

  function handleGoBack() {
    if (isLoggedIn) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  if (isLoggedIn === null) {
    return null
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{ minHeight: '100vh', textAlign: 'center' }}
    >
      <ExclamationTriangleIcon width={48} height={48} />
      <Heading size="9">404</Heading>
      <Heading size="5">Página no encontrada</Heading>
      <Text color="gray" size="3" style={{ maxWidth: 400 }}>
        La página que buscas no existe o fue movida a otra dirección.
      </Text>
      <Button size="3" onClick={handleGoBack}>
        {isLoggedIn ? 'Volver al dashboard' : 'Volver al inicio'}
      </Button>
    </Flex>
  )
}