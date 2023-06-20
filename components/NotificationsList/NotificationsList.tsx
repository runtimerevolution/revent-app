import React from 'react'
import Notification from '../Notification/Notification'
import { Notification as NotificationType } from '../helpers/interfaces'

interface NotificationListProps {
  displayedNotifications: NotificationType[]
}

export default function NotificationsList({
  displayedNotifications,
}: NotificationListProps) {
  return (
    <>
      {displayedNotifications.map((notification) => (
        <Notification notification={notification} />
      ))}
    </>
  )
}
