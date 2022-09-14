import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

// const navigation = [
//     { name: 'Photo Contests', href: '#', current: true },
//     { name: 'Challenges', href: '#', current: false },
// ]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const ProfileDropDown = () => {
  return (
    <div className='flex items-center'>
      {/* Profile dropdown */}
      <Menu as='div' className='relative ml-4'>
        <div>
          <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
            <span className='sr-only'>Open user menu</span>
            <img className='h-8 w-8 rounded-full' src={user.imageUrl} alt='' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    {item.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      <div className='hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center'>
        <button
          type='button'
          className='rounded-full p-1 text-orange-400 hover:text-orange-600 focus:outline-none'
        >
          <span className='sr-only'>View notifications</span>
          <BellIcon className='h-6 w-6' aria-hidden='true' />
        </button>
      </div>
      <div className='flex-shrink-0 ml-4 '>
        <button
          type='button'
          className='relative inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
        >
          <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
          <span>Upload</span>
        </button>
      </div>
    </div>
  )
}

export default ProfileDropDown
