const baseUrl = 'http://localhost:8080'

export const query = async (query, variables={}) => {
    try{
      const response = await fetch(baseUrl + '/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error(`Error fetching ${query}:`, error)
      return []
    }
}
