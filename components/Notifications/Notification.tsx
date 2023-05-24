import React from 'react'

export default function Notification({ notification }) {
  console.log('notification', notification)
  return (
    <div className='mb-4 w-80 gap-1 '>
      <div className='grid grid-cols-3 gap-5'>
        {/* {notification.opened && <span className='bg-gray-700'>123</span>} */}
        {notification.opened && (
          <div className='bg-orange-500 h-1 w-2 absolute left-0 '></div>
        )}
        {/* <a className='w-full relative'>
          {notification.opened && (
            <div
              className='bg-orange-500 h-full absolute left-0 top-0'
              style={{ width: '2px' }}
            ></div>
          )}
          <div className={`pl-${notification.opened ? 2 : 0}`}>
            {notification.message}
          </div>
        </a> */}
        <img
          className='w-full'
          src={notification.profile_picture.picture_path}
          alt=''
        />
        <div className='flex flex-col'>
          <a className='w-full'>
            <a className='text-orange-500'>{notification.user}</a>{' '}
            {notification.message}
          </a>
          <div>
            <a className='text-sm text-gray-500'>
              {notification.timestamp.slice(0, 10)}
            </a>
          </div>
        </div>
        <img className='w-full' src='/images/contest.jpeg' alt='' />
      </div>
    </div>
  )
}
