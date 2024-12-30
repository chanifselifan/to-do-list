import { useState, useEffect } from 'react'

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="time-display">
      <p>{currentTime.toLocaleDateString()}</p>
      <p>{currentTime.toLocaleTimeString()}</p>
    </div>
  )
}

export default TimeDisplay