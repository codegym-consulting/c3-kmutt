declare module '#auth-utils' {
    interface User {
      email: string
      name: string
      photoUrl: string
      emailVerified?: boolean
    }
  
    interface UserSession {
      accessToken: string
      refreshToken: string
      expiredAt?: number
      loggedInAt?: number
      isRegistered: boolean
      provider: string
      // Add your own fields
    }
  }
  
export {}