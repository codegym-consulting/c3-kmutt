export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    try {
      // TODO: Query from pin_projects table
      return [{
          id: 1,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1713823799895-bddbbf670531?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'Developing machine learning models to predict spatial positions of objects across the human visualization with..',
          category: 'Technology',
          location: 'Bangkok'
      },{
          id: 2,
          imageUrl: 'https://images.unsplash.com/photo-1718002129552-a0445f9baeb1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'Developing machine learning models to predict spatial positions of objects across the human visualization with..',
          category: 'Technology',
          location: 'Bangkok'
      },
      {
          id: 3,
          imageUrl: 'https://images.unsplash.com/photo-1718036094456-5f57368fdabd?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'Developing machine learning models to predict spatial positions of objects across the human visualization with..',
          category: 'Technology',
          location: 'Bangkok'
      },
      {
          id: 4,
          imageUrl: 'https://plus.unsplash.com/premium_photo-1675362696692-636305144028?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'Developing machine learning models to predict spatial positions of objects across the human visualization with..',
          category: 'Art and Design',
          location: 'Phuket'
      },
      {
          id: 5,
          imageUrl: 'https://images.unsplash.com/photo-1717501219716-b93a67d2f7b2?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'Developing machine learning models to predict spatial positions of objects across the human visualization with..',
          category: 'Technology',
          location: 'Bangkok'
      },
      {
          id: 6,
          imageUrl: 'https://images.unsplash.com/photo-1717501217963-67e30c290e6f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'Developing machine learning models to predict spatial positions of objects across the human visualization with..',
          category: 'Art and Design',
          location: 'Chiang mai'
      }]
    } catch (error) {
      console.error(error)
      return []
    }
  })
  
  
  