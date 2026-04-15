# Trip Planner Frontend

A Next.js web application for creating and managing AI-powered travel itineraries. Users fill out a trip form (origin, destination, budget, preferences) and the app calls the [Trip Planning Agent backend](https://github.com/AaXDing/trip-planning) to generate a day-by-day itinerary using LLMs.

**Live demo:** https://trip-planner-frontend-wvvvas-projects.vercel.app/

**Figma design:** https://www.figma.com/design/kOL2BDdhi3HVewQZTtFIHs/Untitled

---

## Features

- **Dashboard** — trip statistics (pie chart), interactive Google Map with country overlays, upcoming trips list, calendar view
- **Trip Planner** — multi-field form (origin, destination, people, days, budget, cuisines, room type, attraction preferences) that calls the backend agent and renders a timeline itinerary
- **Trip Management** — create, rename, replace, and delete trips; cross-page navigation via localStorage

---

## Tech Stack

- **Next.js 14** / React 18 with App Router
- **Tailwind CSS** + CSS Modules
- **Google Maps API** (`@vis.gl/react-google-maps`)
- **Recharts** (pie chart), **react-calendar** (calendar view)
- **FontAwesome** (icons)

---

## Setup

```bash
npm install

# Optional: set Google Maps API key for the dashboard map
# Create .env.local with:
# NEXT_PUBLIC_GOOGLE_MAP_API=your_key_here

npm run dev
```

The app runs on **http://localhost:3000**.

---

## Backend Integration

The trip planner page calls `POST http://localhost:8001/trips/plan` on the [Trip Planning Agent](https://github.com/AaXDing/trip-planning) backend. To use it:

1. Clone and set up the backend repo
2. Start the backend: `uvicorn app.main:app --port 8001`
3. Start the frontend: `npm run dev`
4. Go to http://localhost:3000/trip, fill in the form, and hit **Create**

The backend uses OpenAI function-calling to search a travel database (accommodations, restaurants, attractions) and generate a structured itinerary.

---

## Project Structure

```
src/app/
├── page.jsx                 # Home — wraps Dashboard with Google Maps provider
├── dashboard/page.jsx       # Dashboard — stats, map, upcoming trips, calendar
└── trip/page.jsx            # Trip planner — form + itinerary timeline

components/
├── Header.jsx               # Navigation header with user profile
├── Navigation.jsx           # Nav buttons (HOME, TRIP, MAP, BUDDY)
├── TripStats.jsx            # Pie chart (trip status breakdown)
├── MapCard.jsx              # Google Map with country overlays
├── UpcomingTrips.jsx        # Next 4 upcoming trip events
└── TripsCalendar.jsx        # Calendar with trip event markers

hooks/
├── useTripData.js           # Fetches & syncs trip stats, upcoming, calendar data
└── useCountryMask.js        # Google Maps country boundary styling

utils/
├── api-utils.js             # REST client — calls backend /trips/plan
├── memory-store.js          # In-memory trip storage (dashboard data)
└── utils.jsx                # Validation, filtering, Google Maps setup
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — redirects to dashboard |
| `/dashboard` | Stats, map, upcoming trips, calendar |
| `/trip` | Trip creation with AI-generated itineraries |
| `/map` | Placeholder |
| `/buddy` | Placeholder |
