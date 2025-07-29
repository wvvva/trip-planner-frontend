import React from 'react'
import styles from './component.module.css'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const TripStats = ({ tripStats }) => {
  const total = tripStats.reduce((acc, entry) => acc + entry.value, 0)
  return (
    <div className={styles['stats-card']}>
      <div className={styles['stats-container']}>
        <div className={styles['stats-list']}>
          {tripStats.map((entry, index) => (
            <div key={`item-${index}`} className={styles['stat-item']}>
            <div key = {`dot-${index}`} className={styles['stat-dot']} style={{ backgroundColor: entry.color }} />
            <span key={`text-${index}`} className={styles['stat-text']}>
              {entry.name}: {entry.value}
            </span>
          </div>
          ))}
          
          <div className={styles['stat-total']}>
            TOTAL: {total}
          </div>
        </div>
        
        {/* Donut chart */}
        <div className={styles['donut-chart']}>
          {total > 0 && (
          <PieChart width={300} height={300} className={styles['donut']}>
            <Pie
              data={tripStats}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {tripStats.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>)}
          {total === 0 && (
            <div className={styles['no-trips']}>
              No trips
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TripStats 