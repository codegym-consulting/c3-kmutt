declare module '#auth-utils' {
    interface User {
      id: number
      email: string
      name: string
      photoUrl: string
      emailVerified: boolean
      provider: string
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