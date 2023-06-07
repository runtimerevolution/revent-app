import React from 'react'
import { useEffect, useRef } from 'react'

import NotificationsList from '../NotificationsList/NotificationsList'
import { Notification as NotificationType } from '../helpers/interfaces'

interface NotificationMenu {
  displayedNotifications: NotificationType[]
  setDisplayedNotifications: React.Dispatch<
    React.SetStateAction<NotificationType[]>
  >
  notifications: NotificationType[]
}

export default function NotificationMenu({
  displayedNotifications,
  setDisplayedNotifications,
  notifications,
}: NotificationMenu) {
  const containerRef = useRef<HTMLDivElement>()
  const handleScroll = () => {
    const scrollableDiv = containerRef.current

    if (scrollableDiv) {
      const { scrollTop, clientHeight, scrollHeight } = scrollableDiv

      if (scrollTop + clientHeight >= scrollHeight) {
        const startIndex = displayedNotifications.length
        const endIndex = startIndex + 3

        const nextNotifications = notifications.slice(startIndex, endIndex)
        setDisplayedNotifications((prevNotifications) => [
          ...prevNotifications,
          ...nextNotifications,
        ])
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  })
  return (
    <div
      ref={containerRef}
      className='absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-4 max-h-60 overflow-y-auto '
    >
      {displayedNotifications && (
        <NotificationsList displayedNotifications={displayedNotifications} />
      )}
      {!displayedNotifications && <p>No notifications to display!</p>}
    </div>
  )
}
