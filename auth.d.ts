declare module '#auth-utils' {
    interface User {
      email: string
      name: string
      photoUrl: string
      email_verified?: boolean
      expiredAt?: number
    }
  
    interface UserSession {
      loggedInAt: number
      provider: string
      isRegistered: boolean
      // Add your own fields
    }
  }
  
export {}