export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    try {
      // TODO: Query from notification table
      return [{
          id: 1,
          userId: 23,
          title: 'Nattaporn S. has commentted on your project',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZSUyMGZhY2V8ZW58MHx8MHx8fDA%3D',
          externalUrl: '/project/1'
      },
      {
        id: 2,
        userId: 23,
        title: 'Nattaporn S. has download your project',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZSUyMGZhY2V8ZW58MHx8MHx8fDA%3D',
        externalUrl: '/project/1'
    },
    {
        id: 2,
        userId: 23,
        title: 'Nattaporn S. has download your project',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZSUyMGZhY2V8ZW58MHx8MHx8fDA%3D',
        externalUrl: '/project/1'
    },
    {
        id: 2,
        userId: 23,
        title: 'Nattaporn S. has download your project',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZSUyMGZhY2V8ZW58MHx8MHx8fDA%3D',
        externalUrl: '/project/1'
    },
    {
        id: 2,
        userId: 23,
        title: 'Nattaporn S. has download your project',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZSUyMGZhY2V8ZW58MHx8MHx8fDA%3D',
        externalUrl: '/project/1'
    },
    {
        id: 2,
        userId: 23,
        title: 'Nattaporn S. has download your project',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZSUyMGZhY2V8ZW58MHx8MHx8fDA%3D',
        externalUrl: '/project/1'
    }]
    } catch (error) {
      console.error(error)
      return []
    }
  })
  
  
  