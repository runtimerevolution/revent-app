import React from 'react'
import Notification from '../Notification/Notification'
import { Notification as NotificationType } from '../helpers/interfaces'

interface NotificationsListProps {
  displayedNotifications: NotificationType[]
}

export default function NotificationsList({
  displayedNotifications,
}: NotificationsListProps) {
  return (
    <>
      {displayedNotifications.map((notification, key) => (
        <Notification key={key} notification={notification} />
      ))}
    </>
  )
}
