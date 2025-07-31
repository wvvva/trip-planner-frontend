import React, { useState, useEffect } from 'react'
import styles from './component.module.css'
import {Map, useMap, Polygon, useMapsLibrary} from '@vis.gl/react-google-maps';


const MapCard = () => {
  const mapLib = useMapsLibrary('maps');

  useEffect(() => {  
    if (!mapLib) return;
    const map = new mapLib.Map(document.getElementById("map"), {
      center: { lat: 20.773, lng: -156.01 }, // Hana, HI
      zoom: 12,
      // In the cloud console, configure this Map ID with a style that enables the
      // "Locality" feature layer.
      mapId: process.env.NEXT_PUBLIC_GMAP_STYLE_DASH, // <YOUR_MAP_ID_HERE>,
    });

    const featureLayer = map.getFeatureLayer("LOCALITY");

    const featureStyleOptions = {
      strokeColor: "#810FCB",
      strokeOpacity: 1.0,
      strokeWeight: 3.0,
      fillColor: "#810FCB",
      fillOpacity: 0.5,
    };


    featureLayer.style = (options) => {
      if (options.feature.placeId == "ChIJ0zQtYiWsVHkRk8lRoB1RNPo") {
        return featureStyleOptions;
      }
    };
  }, [mapLib]);

  return (
    <div className={styles['map-card']}>
      <h2 className={styles['card-title']}>MAP</h2>
      <div className={styles['map-placeholder']}>
        <div id="map"></div>
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