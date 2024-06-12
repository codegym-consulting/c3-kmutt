declare module '#auth-utils' {
    interface User {
      email: string
      name: string
      photoUrl: string | null
      email_verified?: boolean
      expiredAt?: number
    }
  
    interface UserSession {
      loggedInAt: number
      provider: string
      // Add your own fields
    }
  }
  
export {}