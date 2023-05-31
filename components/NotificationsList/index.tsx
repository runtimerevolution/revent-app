import React from 'react'
import Notification from '../Notifications'
import { Notification as NotificationType } from '../helpers/interfaces'

interface NotificationList {
  displayedNotifications: NotificationType[]
}

export default function NotificationsList({
  displayedNotifications,
}: NotificationList) {
  return (
    <>
      {displayedNotifications.map((notification) => (
        <Notification notification={notification} />
      ))}
    </>
  )
}
