import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './component.module.css'

const UpcomingTrips = ({ trips }) => {
  const router = useRouter()

  const handleTripClick = (trip) => {
    if (!trip?.eventId || !trip?.tripName) return
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'selectedTripEvent',
        JSON.stringify({ tripName: trip.tripName, eventId: trip.eventId })
      )
    }
    router.push('/trip')
  }

  const renderUpcomingTrips = () => {
    return trips.map((trip, index) => (
      <div
        key={trip.id || index}
        className={styles['upcoming-item']}
        role="button"
        tabIndex={0}
        onClick={() => handleTripClick(trip)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleTripClick(trip)
          }
        }}
      >
        <p className={styles['upcoming-time']}>{trip.time}</p>
        <div className = {styles['upcoming-detail']}>
          <p className={styles['upcoming-flight']}>{trip.flight}</p>
          <p className={styles['upcoming-trip']}>{trip.trip}</p>
        </div>
        <div className = {styles['upcoming-divider']}></div>
      </div>
    ))
  }

  return (
    <div className={styles['upcoming-card']}>
      <h2 className={styles['card-title']}>UPCOMING</h2>
      <div className={styles['upcoming-list']}>
        {renderUpcomingTrips()}
      </div>
    </div>
  )
}

export default UpcomingTrips 
