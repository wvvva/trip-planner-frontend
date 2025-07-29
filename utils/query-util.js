export const getTripByUserIdAndStatusQuery = (userId, status) => {
  return `,
    query {
      getTripByUserIdAndStatus(userId: ${userId}, status: ${status}) {
        id
      }
    }
  `
}
