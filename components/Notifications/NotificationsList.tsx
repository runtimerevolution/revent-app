import React from 'react'
import Notification from './Notification'

export default function NotificationsList({ notifications }) {
  return (
    <div className='absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-4 max-h-60 overflow-y-auto'>
      {notifications.map((notification) => (
        <>
          <Notification notification={notification} />
        </>
      ))}
    </div>
  )
}
