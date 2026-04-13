// Backend calls are disabled for now. Using in-session memory store instead.
import { getTripStats } from './memory-store'
import {useMapsLibrary} from '@vis.gl/react-google-maps';
import { Loader } from '@googlemaps/js-api-loader'

export async function calculateTripStats(userId) {
  const statuses = [
    { label: 'Completed', keys: ['COMPLETED'], color: 'var(--color-secondary-dark)' },
    { label: 'Planning', keys: ['PLANNING', 'CONFIRMED', 'IN_PROGRESS'], color: 'var(--color-secondary-light)' },
    { label: 'Cancelled', keys: ['CANCELLED'], color: 'var(--color-gray)' },
  ];

  const counts = getTripStats(userId)
  const stats = statuses.map(({ label, keys, color }) => ({
    name: label,
    value: keys.reduce((acc, key) => acc + (counts[key] || 0), 0),
    color
  }))

  return stats
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

export const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
  version: 'weekly',
  libraries: ['maps']
})

export async function findBoundary(country, center) {
  const request = {
    textQuery: country,
    fields: ["id", "location"],
    includedType: "locality",
    locationBias: center,
  };
  const { Place } = await google.maps.importLibrary("places");
  //@ts-ignore
  const { places } = await Place.searchByText(request);

  if (places.length) {
    const place = places[0];
    return place.id;
  } else {
    console.log("No results");
  }
}
