import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './component.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

const NewTripButton = ({ showInner = true }) => {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (!showInner) return
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('createTripOnLoad', '1')
    }
    router.push('/trip')
  }

  return (
    <div
      className={`${styles['new-trip-button']} ${
        !showInner ? styles['new-trip-button--static'] : ''
      }`}
      onClick={handleClick}
    >
      {showInner && (
        <div 
          className={styles['new-trip-button-circle']}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FontAwesomeIcon icon={faPlaneDeparture} style={{color: 'var(--color-primary-alter)', fontSize: '20px'}}/>
        </div>
      )}
      
      {showInner && isHovered && (
        <div className={styles['button-text-container']}>
          <span className={styles['button-text']}>Start a New Trip</span>
        </div>
      )}
      
    </div>
  )
}

export default NewTripButton 
