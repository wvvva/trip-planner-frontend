import React, { useState } from 'react'
import styles from './component.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

const NewTripButton = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className={styles['new-trip-button']}>
      <div 
        className={styles['new-trip-button-circle']}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FontAwesomeIcon icon={faPlaneDeparture} style={{color: 'var(--color-primary-alter)', fontSize: '20px'}}/>
      </div>
      
      {isHovered && (
        <div className={styles['button-text-container']}>
          <span className={styles['button-text']}>Start a New Trip</span>
        </div>
      )}
      
    </div>
  )
}

export default NewTripButton 