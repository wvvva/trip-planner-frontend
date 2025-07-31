import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Trip Planner Dashboard',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/d14321a475.js" crossOrigin="anonymous"></script>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}&libraries=maps`}
          async
          defer
        ></script>
      </head>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}

export default RootLayout 