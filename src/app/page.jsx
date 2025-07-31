'use client'

import React from 'react'
import Dashboard from './dashboard/page'
import Header from '@/components/Header'
import {APIProvider} from '@vis.gl/react-google-maps';

export default function HomePage() {
  const gMapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API
  return (
    <>
      <APIProvider apiKey={gMapKey}>
        <Dashboard />
      </APIProvider>
    </>
  )
} 