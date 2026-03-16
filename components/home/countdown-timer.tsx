'use client'

import { useEffect, useState } from 'react'

const REUNION_DATE = new Date('2027-07-15T00:00:00')

function getTimeLeft(target: Date) {
  const now = new Date()
  const diff = Math.max(0, target.getTime() - now.getTime())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return { days, hours, minutes }
}

export function CountdownTimer() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(REUNION_DATE))

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setTimeLeft(getTimeLeft(REUNION_DATE)), 60_000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    const { days, hours, minutes } = getTimeLeft(REUNION_DATE)
    return (
      <CountdownDisplay days={days} hours={hours} minutes={minutes} />
    )
  }

  return (
    <CountdownDisplay
      days={timeLeft.days}
      hours={timeLeft.hours}
      minutes={timeLeft.minutes}
    />
  )
}

function CountdownDisplay({
  days,
  hours,
  minutes,
}: {
  days: number
  hours: number
  minutes: number
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-display font-bold sm:text-4xl lg:text-5xl tabular-nums text-white">
          {days}
        </span>
        <span className="text-xs font-body text-white/90 sm:text-sm">Days</span>
      </div>
      <span className="text-legacy-gold-bright text-2xl font-bold" aria-hidden="true">
        |
      </span>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-display font-bold sm:text-4xl lg:text-5xl tabular-nums text-white">
          {hours}
        </span>
        <span className="text-xs font-body text-white/90 sm:text-sm">Hours</span>
      </div>
      <span className="text-legacy-gold-bright text-2xl font-bold" aria-hidden="true">
        |
      </span>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-display font-bold sm:text-4xl lg:text-5xl tabular-nums text-white">
          {minutes}
        </span>
        <span className="text-xs font-body text-white/90 sm:text-sm">Minutes</span>
      </div>
    </div>
  )
}
