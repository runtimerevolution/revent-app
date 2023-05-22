import React from 'react'

export default function Notification({ notification }) {
  return (
    <div className='mb-4 w-full'>
      {!notification.opened && (
        <>
          <img className='w-6/12' src='/images/contest.jpeg' alt='' />
          <a>{notification.message}</a>
          {/* <a>{notification.message}</a> */}
          <p>{notification.timestamp.slice(0, 10)}</p>
        </>
        // {contest.date_end.slice(0, 10)}
      )}
    </div>
  )
}
