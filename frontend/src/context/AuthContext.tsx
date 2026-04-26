'use client'

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback,
  ReactNode 
} from 'react'
import { 
  isAuthenticated, 
  getToken, 
  clearTokens, 
  isTokenExpiring,
  setTokens
} from '@/lib/api-client'
import { getUserById } from '@/services/users.service'

// ============================================
// TIPOS
// ============================================

interface AuthUser {
  id: number
  email: string
  name: string
  role: string
  photo: string | null
}

interface AuthContextType {
  // Estado
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  isTokenExpiring: boolean
  
  // Acciones
  login: (accessToken: string, refreshToken: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ============================================
// PROVIDER
// ============================================

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTokenExpiringState, setIsTokenExpiringState] = useState(false)

  // Verificar autenticación al montar el componente
  const checkAuth = useCallback(async () => {
    setIsLoading(true)
    
    try {
      if (!isAuthenticated()) {
        setUser(null)
        return
      }
      
      // Obtener el token
      const token = getToken()
      if (!token) {
        setUser(null)
        return
      }
      
      // Decodificar el token para obtener el user_id
      // El token JWT tiene formato: header.payload.signature
      const payload = JSON.parse(atob(token.split('.')[1]))
      const userId = payload.user_id
      
      if (!userId) {
        setUser(null)
        return
      }
      
      // Obtener datos del usuario
      const userData = await getUserById(userId)
      
      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        photo: userData.photo,
      })
    } catch (error) {
      console.error('Error checking auth:', error)
      setUser(null)
      clearTokens()
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Iniciar sesión
  const login = useCallback(async (accessToken: string, refreshToken: string) => {
    setTokens(accessToken, refreshToken)
    await checkAuth()
  }, [checkAuth])

  // Cerrar sesión
  const logout = useCallback(() => {
    clearTokens()
    setUser(null)
    // Redireccionar al login
    window.location.href = '/auth/login'
  }, [])

  // Refresh de sesión
  const refreshSession = useCallback(async () => {
    // Esta función puede ser llamada para forzar un refresh
    // El api-client ya maneja el refresh automáticamente
    await checkAuth()
  }, [checkAuth])

  // Efecto para verificar autenticación al montar
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Efecto para verificar si el token está por expirar
  useEffect(() => {
    if (!user) return
    
    const interval = setInterval(() => {
      setIsTokenExpiringState(isTokenExpiring())
    }, 30000) // Verificar cada 30 segundos
    
    return () => clearInterval(interval)
  }, [user])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isTokenExpiring: isTokenExpiringState,
    login,
    logout,
    checkAuth,
    refreshSession,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ============================================
// HOOK
// ============================================

/**
 * Hook para acceder al contexto de autenticación
 * @throws Error si se usa fuera de AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

// ============================================
// HOC - Componente de protección de rutas
// ============================================

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return fallback || <AuthLoadingScreen />
  }

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/unauthorized'
    }
    return null
  }

  return <>{children}</>
}

// Pantalla de carga de autenticación
function AuthLoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#fafafa'
    }}>
      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          width: 40,
          height: 40,
          border: '3px solid #e0e0e0',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <p style={{ color: '#666', fontSize: 14 }}>Cargando...</p>
      </div>
    </div>
  )
}