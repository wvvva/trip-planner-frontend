const tripStore = {
  trips: [
    {
      id: 1,
      userId: 1,
      status: 'COMPLETED',
      destination: 'Rome',
      date: '2025-06-15',
      endDate: '2025-06-22'
    },
    {
      id: 2,
      userId: 1,
      status: 'PLANNING',
      destination: 'Hawaii',
      date: '2025-08-12',
      endDate: '2025-08-17'
    },
    {
      id: 3,
      userId: 1,
      status: 'CONFIRMED',
      destination: 'Tokyo',
      date: '2025-09-05',
      endDate: '2025-09-12'
    },
    {
      id: 4,
      userId: 1,
      status: 'CANCELLED',
      destination: 'Reykjavik',
      date: '2025-07-01',
      endDate: '2025-07-07'
    },
    {
      id: 5,
      userId: 1,
      status: 'IN_PROGRESS',
      destination: 'NYC',
      date: '2025-08-10',
      endDate: '2025-08-13'
    }
  ]
}

export const getTripsByUserId = (userId) => {
  return tripStore.trips.filter((trip) => trip.userId === userId)
}

export const setTripsForUser = (userId, trips) => {
  tripStore.trips = [
    ...tripStore.trips.filter((trip) => trip.userId !== userId),
    ...trips.map((trip, index) => ({
      id: trip.id ?? Date.now() + index,
      userId,
      ...trip
    }))
  ]
}

export const getTripStats = (userId) => {
  const trips = getTripsByUserId(userId)
  const counts = trips.reduce((acc, trip) => {
    acc[trip.status] = (acc[trip.status] || 0) + 1
    return acc
  }, {})

  return {
    COMPLETED: counts.COMPLETED || 0,
    PLANNING: counts.PLANNING || 0,
    CONFIRMED: counts.CONFIRMED || 0,
    IN_PROGRESS: counts.IN_PROGRESS || 0,
    CANCELLED: counts.CANCELLED || 0
  }
}

const parseDate = (value) => {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export const getUpcomingTrips = (userId, limit = 4) => {
  const now = new Date()
  const events = getTripsByUserId(userId)
    .flatMap((trip) => {
      const tripName = trip.name || `${trip.destination} Trip`
      const tripDestination = trip.destination || tripName.replace(/\s*Trip$/i, '')
      return (trip.events || []).map((event) => ({
        ...event,
        tripName,
        tripDestination
      }))
    })
    .map((event) => ({ event, date: parseDate(event.date) }))
    .filter(({ date }) => date && date > now)
    .sort((a, b) => a.date - b.date)
    .slice(0, limit)

  return events.map(({ event, date }) => ({
    id: event.id,
    eventId: event.id,
    tripName: event.tripName,
    time: `${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })} ${event.time || ''}`.trim(),
    flight: event.title || event.activity || `Trip to ${event.tripDestination}`,
    trip: event.tripName
  }))
}

export const getCalendarTrips = (userId) => {
  return getTripsByUserId(userId)
    .flatMap((trip) => {
      const tripName = trip.name || `${trip.destination} Trip`
      return (trip.events || []).map((event) => ({
        id: event.id,
        eventId: event.id,
        title: event.title || event.activity || tripName,
        date: event.date,
        tripName
      }))
    })
    .filter((event) => parseDate(event.date))
}
