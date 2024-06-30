declare module '#auth-utils' {
    interface User {
      id: number
      email: string
      name: string
      photoUrl: string | null
      emailVerified: boolean
    }
  
    interface UserSession {
      accessToken?: string
      refreshToken?: string
      expiredAt?: number
      loggedInAt?: number
      isRegistered: boolean
      provider: string
    }
  }
  
export {}