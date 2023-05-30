import React from 'react'
import Notification from '../Notifications/Notification'
import { NotificationsList } from '../helpers/interfaces'

export default function NotificationsList({
  displayedNotifications,
}: NotificationsList) {
  return (
    <>
      {displayedNotifications.map((notification) => (
        <Notification notification={notification} />
      ))}
    </>
  )
}
