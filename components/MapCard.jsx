import React, { useState, useEffect } from 'react'
import styles from './component.module.css'
import useCountryMask from '@/hooks/useCountryMask'

const MapCard = () => {const [center, setCenter] = useState({ lat: 30, lng: 0 })
  const [completedCountries, setCompletedCountries] = useState(['America', 'China', 'Japan'])
  const [plannedCountries, setPlannedCountries] = useState(['Spain', 'Russia'])

  useCountryMask(center, [{'countries' : completedCountries, 'color' : '#DEAA79'}, {'countries' : plannedCountries, 'color' : '#FFE6A9'}])

  return (
    <div className={styles['map-card']}>
      <h2 className={styles['card-title']}>MAP</h2>
      <div className={styles['map-placeholder']}>
        <div id="map" className={styles['map-placeholder']}></div>
        {/* <Map
          defaultCenter={{ lat: 20, lng: 0 }}
          defaultZoom={2}
          mapId={process.env.NEXT_PUBLIC_GMAP_STYLE_DASH}
        >
          {/* {features.map((feature, index) => (
            <Polygon
              key={index}
              paths={feature.geometry.coordinates[0].map(([lng, lat]) => ({ lat, lng }))}
              options={{
                fillColor: '#00aaff',
                fillOpacity: 0.3,
                strokeColor: '#0077aa',
                strokeWeight: 1,
              }}
            />
          ))} 
        </Map> */}
      </div>
      <p className={styles['map-description']}>
        You have been to 3 countries, and you are planning to go to 5 new ones
      </p>
    </div>
  )
}

export default MapCard 