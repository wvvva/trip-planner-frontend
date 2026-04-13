import { useState, useEffect } from 'react'
import { calculateTripStats } from '@/utils/utils'
import {
  getUpcomingTrips,
  getCalendarTrips,
  setTripsForUser,
  getTripsByUserId
} from '@/utils/memory-store'

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
    };
  
    if (userId != null) {
      fetchTripStats();
    }
  }, [userId]);

  const [upcomingTrips, setUpcomingTrips] = useState(getUpcomingTrips(userId))

  const [calendarTrips, setCalendarTrips] = useState(getCalendarTrips(userId))

  useEffect(() => {
    if (userId != null) {
      setUpcomingTrips(getUpcomingTrips(userId))
      setCalendarTrips(getCalendarTrips(userId))
    }
  }, [userId])

  const refreshTripStats = async () => {
    const stats = await calculateTripStats(userId)
    const totalValue = stats.reduce((acc, entry) => acc + entry.value, 0)
    setTripStats([...stats, { name: 'Total', value: totalValue }])
  }

  const updateTripsInMemory = async (upcoming, calendar) => {
    const existing = getTripsByUserId(userId)
    const fallback = existing.length
      ? existing
      : []

    if (!upcoming && !calendar) return

    const derived = []
    if (calendar && calendar.length) {
      calendar.forEach((trip) => {
        derived.push({
          status: 'PLANNING',
          destination: trip.destination,
          date: trip.startDate || trip.date,
          endDate: trip.endDate || trip.date
        })
      })
    }

    if (derived.length) {
      setTripsForUser(userId, derived)
    } else if (!fallback.length && upcoming && upcoming.length) {
      const mapped = upcoming.map((trip, index) => ({
        status: 'PLANNING',
        destination: trip.trip?.replace(' Trip', '') || `Trip ${index + 1}`,
        date: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10)
      }))
      setTripsForUser(userId, mapped)
    }

    if (userId != null) {
      await refreshTripStats()
    }
  }

  const setUpcomingTripsWithMemory = (trips) => {
    setUpcomingTrips(trips)
    updateTripsInMemory(trips, null)
  }

  const setCalendarTripsWithMemory = (trips) => {
    setCalendarTrips(trips)
    updateTripsInMemory(null, trips)
  }

  return {
    tripStats,
    upcomingTrips,
    calendarTrips,
    setTripStats,
    setUpcomingTrips: setUpcomingTripsWithMemory,
    setCalendarTrips: setCalendarTripsWithMemory
  }
}
