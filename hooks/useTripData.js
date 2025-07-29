import { useState, useEffect } from 'react'
import { calculateTripStats } from '@/utils/utils'

export const useTripData = (userId) => {
  const [tripStats, setTripStats] = useState(calculateTripStats(userId))

  const [upcomingTrips, setUpcomingTrips] = useState([
    { 
      time: 'Aug 12 9:00-12:00', 
      flight: 'Flight from Miami to Hawaii', 
      trip: 'Hawaii Trip' 
    },
    { 
      time: 'Aug 12 9:00-12:00', 
      flight: 'Flight from Miami to Hawaii', 
      trip: 'Hawaii Trip' 
    },
    { 
      time: 'Aug 12 9:00-12:00', 
      flight: 'Flight from Miami to Hawaii', 
      trip: 'Hawaii Trip' 
    },
    { 
      time: 'Aug 12 9:00-12:00', 
      flight: 'Flight from Miami to Hawaii', 
      trip: 'Hawaii Trip' 
    },
  ])

  const [calendarTrips, setCalendarTrips] = useState([
    { date: 'Aug 12 - 17', destination: 'Hawaii' },
    { date: 'Aug 12 - 17', destination: 'Hawaii' },
    { date: 'Aug 12 - 17', destination: 'Hawaii' },
    { date: 'Aug 12 - 17', destination: 'Hawaii' },
    { date: 'Aug 12 - 17', destination: 'Hawaii' },
  ])

  return {
    tripStats,
    upcomingTrips,
    calendarTrips,
    setTripStats,
    setUpcomingTrips,
    setCalendarTrips
  }
} 