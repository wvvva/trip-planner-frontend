import React from 'react'
import styles from './component.module.css'

const UpcomingTrips = ({ trips }) => {
  const renderUpcomingTrips = () => {
    return trips.map((trip, index) => (
      <div key={index} className={styles['upcoming-item']}>
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