export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    try {
      // TODO: Query from network_request table
      return [{
          id: 1,
          userId: 23,
          name: 'Dr. Bomb K.',
          avatarUrl: 'https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          occupation: 'Researcher',
          department: 'Science',
          organization: 'KMUTT',
          areaOfInterests: ['Technology', 'Science', 'Mental Health'],
      },
      {
        id: 2,
        userId: 34,        
        name: 'Prof. Anna S.',
        avatarUrl: 'https://plus.unsplash.com/premium_photo-1663054688278-ebf09d654d33?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        occupation: 'Instructor',
        department: 'Material Science',
        organization: 'KMUTT',
        areaOfInterests: ['Art', 'People'],
    }]

      
    } catch (error) {
      console.error(error)
      return []
    }
  })
  
  
  