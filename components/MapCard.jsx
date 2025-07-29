import React from 'react'
import styles from './component.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const MapCard = () => {
  return (
    <div className={styles['map-card']}>
      <h2 className={styles['card-title']}>MAP</h2>
      <div className={styles['map-placeholder']}>
        <svg 
          className={styles['map-icon']} 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} style={{color: 'var(--color-gray)', fontSize: '20px'}}/>
        </svg>
      </div>
      <p className={styles['map-description']}>
        You have been to 3 countries, and you are planning to go to 5 new ones
      </p>
    </div>
  )
}

export default MapCard 