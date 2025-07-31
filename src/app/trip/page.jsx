'use client'

import React, { useState } from 'react'
import styles from '../trip/trip.module.css'
import Header from '../../../components/Header'
import TripStats from '../../../components/TripStats'
import MapCard from '../../../components/MapCard'
import UpcomingTrips from '../../../components/UpcomingTrips'
import TripsCalendar from '../../../components/TripsCalendar'
import { useTripData } from '@/hooks/useTripData'

const Trip = () => {
  const [currentMonth, setCurrentMonth] = useState('August 2025')
  // const { tripStats, upcomingTrips, calendarTrips } = useTripData()

  return (
    <div className={styles['dashboard-container']}>
      <Header home={false} trip={true} map={false} buddy={false} />
      
      <div className={styles['main-content']}>
        {/* Left Column */}
        <div className={styles['content-column']}>
         
        </div>

        {/* Right Column */}
        <div className={styles['content-column']}>
          
        </div>
      </div>
    </div>
  )
}

export default Trip 