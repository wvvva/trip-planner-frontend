import React from 'react'
import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Trip Planner Dashboard',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Script
            src="https://kit.fontawesome.com/d14321a475.js"
            crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}

export default RootLayout 