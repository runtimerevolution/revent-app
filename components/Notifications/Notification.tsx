import React from 'react'
import { useState } from 'react'

export default function Notification({ notification }) {
  const [opened, setOpened] = useState(notification.opened)
  return (
    <>
      <a onClick={() => setOpened(true)}>
        <div className='mb-4 w-80 gap-1'>
          <div className='grid grid-cols-3 gap-5'>
            {!opened && (
              <div className='bg-orange-500 h-1/6 w-1 absolute left-0 mt-6 rounded-full'></div>
            )}
            <img
              className='w-full rounded-full'
              src={notification.profile_picture.picture_path}
              alt=''
            />
            <div className='flex flex-col'>
              <a className='w-full text-orange-500'>{notification.user}</a>{' '}
              {notification.message}
              <div>
                <a className='text-sm text-gray-500'>
                  {notification.timestamp.slice(0, 10)}
                </a>
              </div>
            </div>
            <img
              className='w-full rounded-lg'
              src='/images/contest.jpeg'
              alt=''
            />
          </div>
        </div>
      </a>
    </>
  )
}
