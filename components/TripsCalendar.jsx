import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import styles from './component.module.css'

const TripsCalendar = ({trips}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const router = useRouter()

  const getDateKey = (date) => date.toISOString().split('T')[0]

  const eventsByDate = trips.reduce((acc, trip) => {
    const date = getDateKey(new Date(trip.date))
    acc[date] = acc[date] ? [...acc[date], trip] : [trip]
    return acc
  }, {})

  const handleDateClick = (date) => {
    setSelectedDate(date)
  }

  const handleEventClick = (event) => {
    if (!event?.eventId || !event?.tripName) return
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'selectedTripEvent',
        JSON.stringify({ tripName: event.tripName, eventId: event.eventId })
      )
    }
    router.push('/trip')
  }

  return (
    <div className={styles['calendar-card']}>
      <div className={styles['calendar-container']}>
        <Calendar
          className={styles['custom-calendar']}
          onClickDay={handleDateClick}
          value={selectedDate}
          tileClassName={({ date }) => {
            const dateKey = getDateKey(date);
            const isPast = date < new Date().setHours(0, 0, 0, 0);
            const hasEvent = eventsByDate[dateKey];
            
            return [
              isPast ? styles.pastDate : '',
              hasEvent ? styles.hasEvent : '',
            ].join(' ');
          }}
        />
        <div className={styles.eventList}>
          {eventsByDate[getDateKey(selectedDate)] ? (
            eventsByDate[getDateKey(selectedDate)].map((event, i) => (
              <div
                key={event.id || i}
                className={styles.eventItem}
                role="button"
                tabIndex={0}
                onClick={() => handleEventClick(event)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEventClick(event)
                }}
              >
                <span>{event.title}</span>
              </div>
            ))
          ) : (
            <div className={styles.eventNoItem}>
                <p>No Events</p>
              </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TripsCalendar 
