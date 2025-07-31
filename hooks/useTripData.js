import { useState, useEffect } from 'react'
import { calculateTripStats } from '@/utils/utils'

export const useTripData = (userId) => {
  const [tripStats, setTripStats] = useState(null)

  useEffect(() => {
    const fetchTripStats = async () => {
      const stats = await calculateTripStats(userId);
      const totalValue = stats.reduce((acc, entry) => acc + entry.value, 0);
      const updatedStats = [...stats, {
        name: 'Total',
        value: totalValue
      }];
      setTripStats(updatedStats);
      console.log(updatedStats);
    };
  
    if (userId != null) {
      fetchTripStats();
    }
  }, [userId]);

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