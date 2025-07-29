import { getTripByUserIdAndStatusQuery } from './query-util'

const baseUrl = 'http://localhost:8080'

export const getTripsByUserIdAndStatus = async (userId, status) => {
    try{
      const response = await fetch(baseUrl + '/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getTripByUserIdAndStatusQuery(userId, status)
        })
      })
      const data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      console.error('Error fetching completed trips:', error)
      return []
    }
}
