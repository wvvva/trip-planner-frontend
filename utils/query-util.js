export const getTripByUserIdAndStatusQuery = `
    query GetTripByUserIdAndStatus($userId: ID!, $status: [TripStatus!]!) {
      getTripByUserIdAndStatus(userId: $userId, status: $status) {
        id
      }
    }
  `;

export const getUpcomingActivities = `
    query GetUpcomingActivities($userId: ID!, $date: String!) {
      findActivityByUserIdAndDate(userId: $userId, date: $date) {
          id 
          title
          startTime
          endTime

          Trip {
            id
            title
          }
        }
      }
    `
