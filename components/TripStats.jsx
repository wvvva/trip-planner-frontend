import styles from './component.module.css'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const TripStats = ({ tripStats }) => {
  return (
    <div className={styles['stats-card']}>
      <div className={styles['stats-container']}>
        <div className={styles['stats-list']}>
          {tripStats && tripStats.map((entry, index) => (
            entry.name != 'Total' && (
            <div key={`item-${index}`} className={styles['stat-item']}>
            <div key = {`dot-${index}`} className={styles['stat-dot']} style={{ backgroundColor: entry.color }} />
            <span key={`text-${index}`} className={styles['stat-text']}>
              {entry.name}: {entry.value}
            </span>
          </div>
          )))}
          
          <div className={styles['stat-total']}>
            TOTAL: {tripStats && tripStats.find(entry => entry.name === 'Total')?.value}
          </div>
        </div>
        
        {/* Donut chart */}
        <div className={styles['donut-chart']}>
          {tripStats && tripStats.find(entry => entry.name === 'Total')?.value > 0 && (
          <PieChart width={300} height={300} className={styles['donut']}>
            <Pie
              data={tripStats.filter(entry => entry.name != 'Total')}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {tripStats && tripStats.filter(entry => entry.name != 'Total').map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>)}
          {tripStats && tripStats.find(entry => entry.name === 'Total')?.value === 0 && (
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