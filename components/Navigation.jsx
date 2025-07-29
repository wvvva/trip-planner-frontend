'use client'

import React, { useState } from 'react'
import styles from './component.module.css'
import { useRouter } from 'next/navigation';

const Navigation = ({home, trip, map, buddy}) => {
  const router = useRouter();

  return (
    <nav className={styles['nav-container']}>
      <button onClick={() => {router.push('/dashboard')}} className={`${styles['nav-button']} ${home ? styles.active : styles.inactive}`}>HOME</button>
      <button onClick={() => {router.push('/trip')}} className={`${styles['nav-button']} ${trip ? styles.active : styles.inactive}`}>TRIP</button>
      <button onClick={() => {router.push('/map')}} className={`${styles['nav-button']} ${map ? styles.active : styles.inactive}`}>MAP</button>
      <button onClick={() => {router.push('/buddy')}} className={`${styles['nav-button']} ${buddy ? styles.active : styles.inactive}`}>BUDDY</button>
    </nav>
  )
}

export default Navigation 