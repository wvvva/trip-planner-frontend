'use client'

import React, { useEffect, useState } from 'react'
import styles from '../trip/trip.module.css'
import Header from '../../../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlaneDeparture,
  faCar,
  faPlus,
  faTrash,
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons'
import { setTripsForUser } from '@/utils/memory-store'

const Trip = () => {
  const [trips, setTrips] = useState([
    {
      name: 'Hawaii Trip',
      plan: {
        agentOutput: {
          trip_summary: 'A quick airport-to-airport transfer day.',
          origin: 'Miami',
          destination: 'Hawaii',
          days: 1,
          people: 1,
          total_estimated_cost: 0,
          budget: 0,
          within_budget: true,
          days_plan: [
            {
              day: 1,
              date: '2026-04-28',
              accommodation: null,
              accommodation_cost: null,
              meals: [],
              meal_cost: null,
              activities: [
                {
                  time: '9:00 AM',
                  activity: 'Flight NF3456 2hrs',
                  location: 'Miami International Airport Terminal 2',
                  estimated_cost: 0,
                  notes: ''
                },
                {
                  time: '12:00 PM',
                  activity: 'Uber 30min',
                  location: 'Hawaii International Airport Terminal 2',
                  estimated_cost: 0,
                  notes: ''
                }
              ],
              daily_total: 0
            }
          ],
          personalization_notes: '',
          warnings: []
        }
      }
    },
    { name: 'Las Vegas Trip', plan: null }
  ])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isReplacePromptOpen, setIsReplacePromptOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [editingTripIndex, setEditingTripIndex] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [pendingEventId, setPendingEventId] = useState(null)
  const userId = 1

  const placeholderAgentOutput = {
    split: 'validation',
    total_samples: 1,
    successful: 1,
    failed: 0,
    budget_compliance_rate: 1.0,
    room_type_match_rate: 0.0,
    cuisine_match_rate: 1.0,
    house_rule_compliance_rate: 1.0,
    avg_attraction_score: 0.0,
    avg_cost_to_budget_ratio: 0.9294,
    per_sample: [
      {
        user_id: '113815392849087130851',
        query_text:
          "User ID: 113815392849087130851. Please create a travel plan for me where I'll be departing from San Francisco and heading to Chicago for a 3-day trip from 2022-03-02 to 2022-03-04, 2022. I need a Private room for accommodation. I'd like to have Eastern Asian Cuisine and Seafood & Organic Cuisine options for dining. Can you help me keep this journey within a budget of $1700?",
        budget_compliance: {
          passed: true,
          detail: 'Cost $1580 vs budget $1700 (OK)'
        },
        room_type_match: {
          passed: false,
          detail: "Required room type 'private room' \u2014 NOT found in itinerary accommodation text."
        },
        cuisine_match: {
          passed: true,
          detail:
            "Cuisines required: ['Eastern Asian Cuisine', 'Seafood & Organic Cuisine']; matched: ['Seafood & Organic Cuisine']."
        },
        house_rule_compliance: {
          passed: true,
          detail: 'No house rule requirement.'
        },
        attraction_score: 0.0,
        itinerary: {
          trip_summary:
            'A 3-day cultural and culinary exploration in Chicago with a focus on Eastern Asian and Seafood cuisines.',
          origin: 'San Francisco',
          destination: 'Chicago',
          days: 3,
          people: 1,
          total_estimated_cost: 1580.0,
          budget: 1700.0,
          within_budget: true,
          days_plan: [
            {
              day: 1,
              date: '2026-05-02',
              accommodation: 'Big bedroom in Astoria, 20 min from Central Park',
              accommodation_cost: 110.0,
              meals: [
                "BIG & little's Restaurant \u2014 lunch",
                "Chief O'Neill's Pub & Restaurant \u2014 dinner"
              ],
              meal_cost: 40.0,
              activities: [
                {
                  time: '10:00 AM',
                  activity: 'Explore the BP Pedestrian Bridge',
                  location: 'BP Pedestrian Bridge',
                  estimated_cost: 0.0,
                  notes: 'Enjoy scenic views of the city.'
                },
                {
                  time: '1:00 PM',
                  activity: 'Visit the Ukrainian National Museum',
                  location: 'Ukrainian National Museum',
                  estimated_cost: 0.0,
                  notes: 'Free admission.'
                },
                {
                  time: '4:00 PM',
                  activity: 'Walk around Wrigley Field',
                  location: 'Wrigley Field',
                  estimated_cost: 0.0,
                  notes: 'Experience the historic baseball stadium.'
                }
              ],
              daily_total: 150.0
            },
            {
              day: 2,
              date: '2026-05-03',
              accommodation: 'Big bedroom in Astoria, 20 min from Central Park',
              accommodation_cost: 110.0,
              meals: [
                'Hoanh Long Vietnamese & Chinese Restaurant \u2014 lunch',
                'La Tropicana Restaurant \u2014 dinner'
              ],
              meal_cost: 50.0,
              activities: [
                {
                  time: '10:00 AM',
                  activity: 'Visit The Art Institute of Chicago',
                  location: 'The Art Institute of Chicago',
                  estimated_cost: 0.0,
                  notes: 'Renowned art museum with free admission on certain days.'
                },
                {
                  time: '1:00 PM',
                  activity: 'Explore the Nicholas J. Melas Centennial Fountain',
                  location: 'Nicholas J. Melas Centennial Fountain',
                  estimated_cost: 0.0,
                  notes: 'A beautiful spot for relaxation.'
                },
                {
                  time: '4:00 PM',
                  activity: 'Enjoy an escape room experience at Fox In A Box Escape Room Chicago',
                  location: 'Fox In A Box Escape Room Chicago',
                  estimated_cost: 30.0,
                  notes: 'Fun and interactive experience.'
                }
              ],
              daily_total: 190.0
            },
            {
              day: 3,
              date: '2026-05-04',
              accommodation: 'Big bedroom in Astoria, 20 min from Central Park',
              accommodation_cost: 110.0,
              meals: [
                "Ditka's Restaurant Chicago \u2014 lunch",
                "BIG & little's Restaurant \u2014 dinner"
              ],
              meal_cost: 60.0,
              activities: [
                {
                  time: '10:00 AM',
                  activity: "Visit Saints Volodymyr & Olha Ukrainian Catholic Church",
                  location: 'Saints Volodymyr & Olha Ukrainian Catholic Church',
                  estimated_cost: 0.0,
                  notes: 'Cultural and historical significance.'
                },
                {
                  time: '1:00 PM',
                  activity: 'Explore the Escape Artistry - Time Gallery',
                  location: 'Escape Artistry - Time Gallery',
                  estimated_cost: 30.0,
                  notes: 'Engaging escape room experience.'
                },
                {
                  time: '4:00 PM',
                  activity: 'Stroll through the scenic areas around the city',
                  location: 'Chicago',
                  estimated_cost: 0.0,
                  notes: 'Enjoy the walkable city environment.'
                }
              ],
              daily_total: 300.0
            }
          ],
          personalization_notes:
            "This itinerary includes a mix of cultural and historical attractions, along with dining options that align with the user's cuisine preferences. Activities are spread evenly across the days, ensuring a balanced experience.",
          warnings: []
        },
        error: null
      }
    ]
  }

  const handleAddTrip = () => {
    setTrips((prev) => [
      ...prev,
      { name: `New Trip ${prev.length + 1}`, plan: null }
    ])
    setActiveIndex(trips.length)
  }

  const getEventId = (tripName, dayNumber, index) => {
    const slug = tripName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    return `${slug}-${dayNumber}-${index}`
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const shouldCreate = window.localStorage.getItem('createTripOnLoad')
    if (!shouldCreate) return
    window.localStorage.removeItem('createTripOnLoad')
    setTrips((prev) => {
      const next = [...prev, { name: `New Trip ${prev.length + 1}`, plan: null }]
      setActiveIndex(next.length - 1)
      return next
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem('selectedTripEvent')
    if (!raw) return
    window.localStorage.removeItem('selectedTripEvent')
    try {
      const parsed = JSON.parse(raw)
      if (parsed?.tripName) {
        const index = trips.findIndex((trip) => trip.name === parsed.tripName)
        if (index >= 0) {
          setActiveIndex(index)
        }
      }
      if (parsed?.eventId) {
        setPendingEventId(parsed.eventId)
      }
    } catch (error) {
      // ignore malformed payload
    }
  }, [trips])

  useEffect(() => {
    if (!pendingEventId) return
    const target = document.querySelector(`[data-event-id="${pendingEventId}"]`)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setPendingEventId(null)
    }
  }, [pendingEventId, activeIndex])

  useEffect(() => {
    const mappedTrips = trips.map((trip) => {
      const plannedItinerary = getItineraryFromAgentOutput(trip.plan?.agentOutput)
      const destination =
        plannedItinerary?.destination || trip.name.replace(/\s*Trip$/i, '') || 'Trip'
      const startDate = plannedItinerary?.days_plan?.[0]?.date || null
      const endDate =
        plannedItinerary?.days_plan?.[plannedItinerary?.days_plan?.length - 1]?.date ||
        startDate ||
        null
      const events = plannedItinerary
        ? plannedItinerary.days_plan.flatMap((dayPlan) =>
            (dayPlan.activities || []).map((activity, index) => ({
              id: getEventId(trip.name, dayPlan.day, index),
              date: dayPlan.date,
              time: activity.time,
              title: activity.location || activity.activity,
              activity: activity.activity
            }))
          )
        : []
      return {
        status: 'PLANNING',
        destination,
        date: startDate,
        endDate,
        name: trip.name,
        events
      }
    })
    setTripsForUser(userId, mappedTrips)
  }, [trips])

  const startEditingTrip = (index) => {
    setEditingTripIndex(index)
    setEditingName(trips[index]?.name || '')
  }

  const commitTripName = () => {
    if (editingTripIndex === null) return
    const nextName = editingName.trim() || trips[editingTripIndex]?.name
    if (!nextName) {
      setEditingTripIndex(null)
      return
    }
    setTrips((prev) =>
      prev.map((trip, index) =>
        index === editingTripIndex ? { ...trip, name: nextName } : trip
      )
    )
    setEditingTripIndex(null)
  }

  const activeTrip = trips[activeIndex]
  const getItineraryFromAgentOutput = (agentOutput) => {
    return agentOutput?.per_sample?.[0]?.itinerary || agentOutput
  }
  const itinerary = getItineraryFromAgentOutput(activeTrip?.plan?.agentOutput)
  const hasPlan = Boolean(itinerary?.days_plan?.length || activeTrip?.plan?.items?.length)
  const tripInfo = itinerary
    ? `${itinerary.origin} → ${itinerary.destination} · ${itinerary.days} days · ${itinerary.people} people · $${itinerary.budget}`
    : activeTrip?.name || 'Trip'

  const buildQuery = (payload) => {
    const daysText = payload.days ? `${payload.days}-day` : 'multi-day'
    const fromText = payload.org ? `from ${payload.org}` : ''
    const toText = payload.dest ? `to ${payload.dest}` : ''
    const peopleText = payload.people_number ? `for ${payload.people_number} people` : ''
    const budgetText = payload.budget ? `with a $${payload.budget} budget` : ''
    const roomText = payload.room_type ? `Room: ${payload.room_type}.` : ''
    const cuisineText = payload.cuisines?.length ? `Cuisines: ${payload.cuisines.join(', ')}.` : ''
    const likesText = payload.attraction_likes?.length
      ? `Likes: ${payload.attraction_likes.join(', ')}.`
      : ''
    const dislikesText = payload.attraction_dislikes?.length
      ? `Avoid: ${payload.attraction_dislikes.join(', ')}.`
      : ''
    const houseRuleText = payload.house_rule ? `Notes: ${payload.house_rule}.` : ''

    const core = `Plan a ${daysText} trip ${fromText} ${toText} ${peopleText} ${budgetText}.`
      .replace(/\s+/g, ' ')
      .trim()

    return `${core} ${roomText} ${cuisineText} ${likesText} ${dislikesText} ${houseRuleText}`.trim()
  }

  const fakeGeneratePlan = () => {
    return placeholderAgentOutput
  }

  const isTravelActivity = (activity) => {
    if (!activity?.activity) return false
    return /(flight|drive|transfer|travel|train|bus|uber|taxi|ride)/i.test(activity.activity)
  }

  const formatCost = (value) => {
    if (!Number.isFinite(value)) return null
    return `$${value.toFixed(0)}`
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isGenerating) return

    const formData = new FormData(event.currentTarget)
    const origin = String(formData.get('origin') || '').trim()
    const destination = String(formData.get('destination') || '').trim()
    const peopleRaw = Number(formData.get('people'))
    const daysRaw = Number(formData.get('days'))
    const budgetRaw = Number(formData.get('budget'))
    const cuisines = String(formData.get('cuisines') || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    const attractionLikes = String(formData.get('preferredAttractions') || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    const attractionDislikes = String(formData.get('avoidedAttractions') || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
    const roomType = String(formData.get('roomType') || '').trim()
    const roomPreference = String(formData.get('roomPreference') || '').trim()

    const payload = {
      query: '',
      org: origin || null,
      dest: destination || null,
      days: Number.isFinite(daysRaw) ? Math.min(Math.max(daysRaw, 1), 30) : null,
      people_number: Number.isFinite(peopleRaw) ? Math.max(peopleRaw, 1) : null,
      budget: Number.isFinite(budgetRaw) ? Math.max(budgetRaw, 0) : null,
      room_type: roomType || null,
      cuisines: cuisines.length ? cuisines : [],
      attraction_likes: attractionLikes.length ? attractionLikes : [],
      attraction_dislikes: attractionDislikes.length ? attractionDislikes : [],
      house_rule: roomPreference || null
    }

    payload.query = buildQuery(payload)

    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const agentOutput = fakeGeneratePlan()

    setTrips((prev) =>
      prev.map((trip, index) =>
        index === activeIndex ? { ...trip, plan: { agentOutput } } : trip
      )
    )

    setIsGenerating(false)
    setIsFormOpen(false)
  }

  const openPlanForm = () => {
    setIsFormOpen(true)
  }

  const handleAddCircleClick = () => {
    setIsMenuOpen(false)
    if (hasPlan) {
      setIsReplacePromptOpen(true)
      return
    }
    openPlanForm()
  }

  const handleReplacePlan = () => {
    setIsReplacePromptOpen(false)
    openPlanForm()
  }

  const handleCreateNewTrip = () => {
    setTrips((prev) => {
      const next = [...prev, { name: `New Trip ${prev.length + 1}`, plan: null }]
      return next
    })
    setActiveIndex(trips.length)
    setIsReplacePromptOpen(false)
    openPlanForm()
  }

  const handleDeleteTrip = () => {
    setTrips((prev) => {
      if (prev.length === 1) {
        return [{ ...prev[0], plan: null }]
      }
      const next = prev.filter((_, index) => index !== activeIndex)
      const nextIndex = Math.min(activeIndex, next.length - 1)
      setActiveIndex(nextIndex)
      return next
    })
    setIsMenuOpen(false)
  }

  return (
    <div className={styles['trip-container']}>
      <Header home={false} trip={true} map={false} buddy={false} showNewTripButton={false} />

      <div className={styles['trip-content']}>
        <aside className={styles['left-panel']}>
          <div className={styles['trips-card']}>
            <div className={styles['trips-title']}>MY TRIPS</div>
            {trips.map((trip, index) => (
              <div
                key={`${trip.name}-${index}`}
                className={`${styles['trip-item']} ${index === activeIndex ? styles['active'] : ''}`}
                onClick={() => setActiveIndex(index)}
                onDoubleClick={() => startEditingTrip(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setActiveIndex(index)
                  }
                }}
              >
                {editingTripIndex === index ? (
                  <input
                    className={styles['trip-input']}
                    value={editingName}
                    onChange={(event) => setEditingName(event.target.value)}
                    onBlur={commitTripName}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        commitTripName()
                      }
                      if (event.key === 'Escape') {
                        setEditingTripIndex(null)
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  trip.name
                )}
              </div>
            ))}
            <button
              type="button"
              className={styles['add-trip-button']}
              onClick={handleAddTrip}
              aria-label="Add trip"
              title="Add trip"
            >
              +
            </button>
          </div>
        </aside>

        <section className={styles['right-panel']}>
          <div className={styles['itinerary-card']}>
            <div className={styles['itinerary-header']}>
              <div className={styles['add-menu']}>
                <button
                  type="button"
                  className={`${styles['add-circle']} ${isMenuOpen ? styles['add-circle-open'] : ''}`}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  aria-label="Trip options"
                  aria-expanded={isMenuOpen}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                <div className={`${styles['add-actions']} ${isMenuOpen ? styles['add-actions-open'] : ''}`}>
                  <button
                    type="button"
                    className={styles['add-action']}
                    onClick={handleAddCircleClick}
                    aria-label="Create plan"
                    title="Create plan"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    type="button"
                    className={styles['add-action']}
                    onClick={handleDeleteTrip}
                    aria-label="Delete trip"
                    title="Delete trip"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
              <div className={styles['trip-info']}>
                <div className={styles['trip-title']}>{activeTrip?.name || 'Trip'}</div>
                <div className={styles['trip-subtitle']}>{tripInfo}</div>
              </div>
            </div>

            <div className={`${styles['timeline']} ${!hasPlan ? styles['timeline-empty'] : ''}`}>
              {hasPlan && itinerary && (
                <>
                  {itinerary.days_plan.map((dayPlan) => {
                    const dayLabel = dayPlan.date || `Day ${dayPlan.day}`
                    return (
                      <div key={dayPlan.day} className={styles['day-timeline']}>
                        <div className={styles['day-label']}>{dayLabel}</div>
                        {dayPlan.activities.map((activity, index) => (
                        <div
                          key={`${dayPlan.day}-${index}`}
                          className={styles['timeline-item']}
                          data-event-id={getEventId(activeTrip.name, dayPlan.day, index)}
                        >
                            <div className={styles['timeline-row']}>
                              <span className={styles['timeline-time']}>{activity.time}</span>
                              <div className={styles['event-card']}>
                                <span>{activity.location || activity.activity}</span>
                                {formatCost(activity.estimated_cost) ? (
                                  <span className={styles['event-cost']}>
                                    {formatCost(activity.estimated_cost)}
                                  </span>
                                ) : (
                                  <span className={styles['event-menu']}>•••</span>
                                )}
                              </div>
                            </div>
                            <div className={styles['event-meta']}>
                              {isTravelActivity(activity) && (
                                <FontAwesomeIcon icon={faPlaneDeparture} className={styles['meta-icon']} />
                              )}
                              <span>{activity.activity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </>
              )}

              {hasPlan && activeTrip?.plan?.items && (
                <>
                  <div className={styles['date-pill']}>{activeTrip.plan.date}</div>
                  {activeTrip.plan.items.map((item, index) => (
                    <div key={`${item.time}-${index}`} className={styles['timeline-item']}>
                      <div className={styles['timeline-row']}>
                        <span className={styles['timeline-time']}>{item.time}</span>
                        <div className={styles['event-card']}>
                          <span>{item.title}</span>
                          <span className={styles['event-menu']}>•••</span>
                        </div>
                      </div>
                      <div className={styles['event-meta']}>
                        <FontAwesomeIcon icon={item.icon} className={styles['meta-icon']} />
                        <span>{item.meta}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {!hasPlan && (
                <div className={styles['empty-message']}>
                  You don&apos;t have any plan yet
                </div>
              )}
            </div>

            {isGenerating && (
              <div className={styles['loading-overlay']}>
                <div className={styles['spinner']} />
                <span>Generating plan...</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {isFormOpen && (
        <div
          className={styles['modal-overlay']}
          onClick={() => {
            if (!isGenerating) setIsFormOpen(false)
          }}
        >
          <div
            className={styles['modal-card']}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="trip-form-title"
          >
            <div className={styles['modal-header']}>
              <h2 id="trip-form-title">Create Trip Plan</h2>
              <button
                type="button"
                className={styles['modal-close']}
                onClick={() => setIsFormOpen(false)}
                aria-label="Close form"
                disabled={isGenerating}
              >
                ×
              </button>
            </div>

            <form className={styles['trip-form']} onSubmit={handleSubmit}>
              <fieldset className={styles['form-fieldset']} disabled={isGenerating}>
              <label className={styles['form-field']}>
                <span>Origin</span>
                <input type="text" name="origin" placeholder="City or airport" />
                <small>Where you&apos;re starting from.</small>
              </label>

              <label className={styles['form-field']}>
                <span>Destination</span>
                <input type="text" name="destination" placeholder="City or region" />
                <small>Your main destination.</small>
              </label>

              <div className={styles['form-row']}>
                <label className={styles['form-field']}>
                  <span>Number of people</span>
                  <input type="number" name="people" min="1" placeholder="1" />
                  <small>How many travelers.</small>
                </label>

                <label className={styles['form-field']}>
                  <span>Number of days</span>
                  <input type="number" name="days" min="1" placeholder="3" />
                  <small>Length of the trip.</small>
                </label>
              </div>

              <label className={styles['form-field']}>
                <span>Budget</span>
                <input type="number" name="budget" min="0" step="50" placeholder="1500" />
                <small>Total trip budget (USD).</small>
              </label>

              <label className={styles['form-field']}>
                <span>Cuisines</span>
                <input type="text" name="cuisines" placeholder="Italian, sushi, vegan" />
                <small>Any food preferences.</small>
              </label>

              <div className={styles['form-row']}>
                <label className={styles['form-field']}>
                  <span>Room type</span>
                  <select name="roomType" defaultValue="">
                    <option value="" disabled>Choose one</option>
                    <option value="Entire home/apt">Entire home/apt</option>
                    <option value="Private room">Private room</option>
                    <option value="Shared room">Shared room</option>
                    <option value="Hotel">Hotel</option>
                  </select>
                  <small>Preferred accommodation.</small>
                </label>

                <label className={styles['form-field']}>
                  <span>Room preference</span>
                  <input type="text" name="roomPreference" placeholder="King bed, no smoking" />
                  <small>Room details or house rules.</small>
                </label>
              </div>

              <label className={styles['form-field']}>
                <span>Preferred attractions</span>
                <textarea name="preferredAttractions" rows="2" placeholder="Museums, beaches, hiking" />
                <small>What you want to see or do.</small>
              </label>

              <label className={styles['form-field']}>
                <span>Avoided attractions</span>
                <textarea name="avoidedAttractions" rows="2" placeholder="Crowded tours, nightlife" />
                <small>What to skip.</small>
              </label>

              <div className={styles['form-actions']}>
                <button
                  type="button"
                  className={styles['secondary-btn']}
                  onClick={() => setIsFormOpen(false)}
                  disabled={isGenerating}
                >
                  Cancel
                </button>
                <button type="submit" className={styles['primary-btn']} disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Create'}
                </button>
              </div>
              </fieldset>
            </form>
          </div>
        </div>
      )}

      {isReplacePromptOpen && (
        <div className={styles['modal-overlay']} onClick={() => setIsReplacePromptOpen(false)}>
          <div
            className={styles['confirm-card']}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="replace-plan-title"
          >
            <h2 id="replace-plan-title">Replace existing plan?</h2>
            <p>
              Creating a new plan for this trip will replace the current one.
              Do you want to continue?
            </p>
            <div className={styles['confirm-actions']}>
              <button
                type="button"
                className={styles['secondary-btn']}
                onClick={() => setIsReplacePromptOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles['secondary-btn']}
                onClick={handleCreateNewTrip}
              >
                Create New Trip
              </button>
              <button
                type="button"
                className={styles['primary-btn']}
                onClick={handleReplacePlan}
              >
                Replace Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Trip
