// import { getCompletedTrips, getPlannedTrips, getCanceledTrips } from './api-utils'
import { getTripsByUserIdAndStatus} from './api-utils'

export const calculateTripStats = (userId) => {
  const completed = getTripsByUserIdAndStatus(userId, ['COMPLETED']).length
  const planning = getTripsByUserIdAndStatus(userId, ['PLANNING', 'CONFIRMED', 'IN_PROGRESS']).length
  const canceled = getTripsByUserIdAndStatus(userId, ['CANCELLED']).length

  return [{
    name: 'Completed',
    value: completed? completed : 0,
    color: 'var(--color-secondary-dark)'
  },
  {
    name: 'Planned',
    value: planning? planning : 0,
    color: 'var(--color-secondary-light)'
  },
  {
    name: 'Canceled',
    value: canceled? canceled : 0,
    color: 'var(--color-gray)'
  }]
}

export const filterUpcomingTrips = (trips, limit = 4) => {
  const now = new Date()
  return trips
    .filter(trip => new Date(trip.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, limit)
}

export const groupTripsByMonth = (trips) => {
  return trips.reduce((groups, trip) => {
    const month = new Date(trip.date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
    
    if (!groups[month]) {
      groups[month] = []
    }
    
    groups[month].push(trip)
    return groups
  }, {})
}

export const validateTripData = (trip) => {
  const errors = []
  
  if (!trip.destination) {
    errors.push('Destination is required')
  }
  
  if (!trip.date) {
    errors.push('Date is required')
  }
  
  if (trip.date && new Date(trip.date) < new Date()) {
    errors.push('Trip date cannot be in the past')
  }
  
  return errors
} 