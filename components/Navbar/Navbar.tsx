import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'

const Navbar = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const collectionsTextColor =
    router.pathname === '/collections' ? 'text-orange-500' : 'text-gray-700'

  const contestsTextColor =
    router.pathname === '/contests' ? 'text-orange-500' : 'text-gray-700'

  const collectionsBackgroundColor =
    router.pathname === '/collections'
      ? 'hover:bg-orange-700'
      : 'hover:bg-gray-700'

  const contestsBackgroundColor =
    router.pathname === '/contests'
      ? 'hover:bg-orange-700'
      : 'hover:bg-gray-700'

  const [showNotifications, setShowNotifications] = useState<boolean>(false)

  const [hasNotifications, setHasNotifications] = useState<boolean>(false)

  const handleToggleNotifications = () => {
    setShowNotifications((prevShowNotifications) => !prevShowNotifications)
  }

  return (
    <nav className='bg-white-800 w-full'>
      <div className='max-w-12xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center flex-shrink-0 text-white'>
            <a className='flex items-center' href='/'>
              <div className='w-10 h-10 mr-2'>
                <Image
                  src='/images/logo.svg'
                  alt='Cleek'
                  width={40}
                  height={40}
                />
              </div>
              <span className='text-gray-700 font-semibold text-xl tracking-tight'>
                Cleek.
              </span>
            </a>

            <div className='hidden md:block'>
              <div className='ml-10 flex items-center space-x-4'>
                <a
                  onClick={() => handleNavigation('/contests')}
                  className={`${contestsTextColor} ${contestsBackgroundColor} hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer`}
                >
                  Photo Contests
                </a>
                <a
                  onClick={() => handleNavigation('/collections')}
                  className={`${collectionsTextColor} ${collectionsBackgroundColor} hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer`}
                >
                  Collections
                </a>
              </div>
            </div>
          </div>
          <div className='relative'>
            <button
              className='relative text-white focus:outline-none rounded-full p-2'
              onClick={handleToggleNotifications}
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 17.5V18.5C9 20.1569 10.3431 21 12 21C13.6569 21 15 20.1569 15 18.5V17.5M5.99999 8.5C5.99999 5.18629 8.68628 3.5 12 3.5C15.3137 3.5 18 5.18629 18 8.5C18 10.4392 18.705 12.6133 19.4316 14.3389C20.0348 15.7717 19.0222 17.5 17.4676 17.5H6.53237C4.97778 17.5 3.96518 15.7717 4.56842 14.3389C5.29493 12.6133 5.99999 10.4392 5.99999 8.5Z'
                  stroke='#001A72'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              {hasNotifications && (
                <span className='absolute top-0 right-0 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'></span>
              )}
            </button>
            {showNotifications && (
              <div className='absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-4'>
                <p>Notification 1</p>
                <p>Notification 2</p>
                <p>Notification 3</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
