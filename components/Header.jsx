import React from 'react'
import styles from './component.module.css'
import NewTripButton from './NewTripButton'
import Navigation from './Navigation'

const Header = ({home, trip, map, buddy, showNewTripButton = true}) => {
  return (
    <header className={styles['header-shell']}>
      <div className={styles['header-container']}>
        <NewTripButton showInner={showNewTripButton} />
        {home && (
          <div className={styles['progress-circles']}>
            <div className={styles['progress-circle']}></div>
            <div className={styles['progress-circle']}></div>
            <div className={styles['progress-circle']}></div>
            <div className={styles['progress-circle']}></div>
          </div>
        )}
      </div>
      <div className={styles['header-container']}>
        <Navigation home={home} trip={trip} map={map} buddy={buddy} />
        <div className={styles['user-profile']}>
            <img src="/images/avatar.png" alt="" />
        </div>
      </div>
    </header>
  )
}

export default Header 
