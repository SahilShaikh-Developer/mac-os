import { useEffect, useState } from 'react'

const formatDateTime = (date) => {
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase()
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toLowerCase()
  const day = date.getDate()

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const period = hours >= 12 ? 'pm' : 'am'

  hours = hours % 12 || 12

  return `${weekday} ${month} ${day} ${hours}:${minutes}${period}`
}

const DateTime = () => {
  const [dateTime, setDateTime] = useState(formatDateTime(new Date()))

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(formatDateTime(new Date()))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <div>{dateTime}</div>
}

export default DateTime
