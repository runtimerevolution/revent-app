import { Disclosure } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Photo Contests', href: '#', current: true },
  { name: 'Challenges', href: '#', current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MobileMenu = () => {
  return (
    <Disclosure.Panel className='md:hidden'>
      <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as='a'
            href={item.href}
            className={classNames(
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className='border-t border-gray-700 pt-4 pb-3'>
        <div className='flex items-center px-5 sm:px-6'>
          <div className='flex-shrink-0'>
            <img
              className='h-10 w-10 rounded-full'
              src={user.imageUrl}
              alt=''
            />
          </div>
          <div className='ml-3'>
            <div className='text-base font-medium text-white'>{user.name}</div>
            <div className='text-sm font-medium text-gray-400'>
              {user.email}
            </div>
          </div>
          <button
            type='button'
            className='ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
          >
            <span className='sr-only'>View notifications</span>
            <BellIcon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='mt-3 space-y-1 px-2 sm:px-3'>
          {userNavigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as='a'
              href={item.href}
              className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </div>
    </Disclosure.Panel>
  )
}

export default MobileMenu
