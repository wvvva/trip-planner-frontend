'use client'

import React, { useState } from 'react'
import styles from './dashboard.module.css'
import Header from '../../../components/Header'
import TripStats from '../../../components/TripStats'
import MapCard from '../../../components/MapCard'
import UpcomingTrips from '../../../components/UpcomingTrips'
import TripsCalendar from '../../../components/TripsCalendar'
import { useTripData } from '@/hooks/useTripData'

const Dashboard = () => {
  const userId = 1
  
  const [currentMonth, setCurrentMonth] = useState('August 2025')
  const { tripStats, upcomingTrips, calendarTrips } = useTripData(userId)

  return (
    <div className={styles['dashboard-container']}>
      <Header home={true} trip={false} map={false} buddy={false} />
      <div className={styles['main-content']}>
        <div className={styles['content-column']}>
          <TripStats tripStats={tripStats} />
          <MapCard />
        </div>
        <UpcomingTrips trips={upcomingTrips} />
        <TripsCalendar 
            trips={[
              { title: 'Trip to NYC', date: '2025-08-10' },
              { title: 'Flight to LA', date: '2025-08-10' },
              { title: 'Trip to Hawaii', date: '2025-08-12' },
            ]}
        />
      </div>
    </div>
  )
}

export default Dashboard 