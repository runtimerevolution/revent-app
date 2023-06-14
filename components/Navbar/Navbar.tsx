import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import {
  getNotificationsList,
  getUserLocal,
} from '../../services/reventService'
import Notification from '../Notifications/Notification'
import UserMenu from './UserMenu'

export default function Navbar() {
  const router = useRouter()
  const handleNavigation = (path: string) => {
    setShowUserMenu(false)
    router.push(path)
  }

  const [notifications, setNotifications] = useState([])
  const [displayedNotifications, setDisplayedNotifications] = useState([])
  const [user, setUser] = useState(null)

  const containerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserLocal()
      setUser(user)
    }
    fetchUser()
  }, [user])

  useEffect(() => {
    async function fetchNotificationsData() {
      try {
        const data = await getNotificationsList()
        const initialNotifications = data.slice(0, 3)
        setDisplayedNotifications(initialNotifications)
        setNotifications(data)
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      }
    }

    fetchNotificationsData()
  }, [])

  const handleScroll = () => {
    const scrollableDiv = containerRef.current

    if (scrollableDiv) {
      const { scrollTop, clientHeight, scrollHeight } = scrollableDiv

      if (scrollTop + clientHeight >= scrollHeight) {
        const startIndex = displayedNotifications.length
        const endIndex = startIndex + 3

        const nextNotifications = notifications.slice(startIndex, endIndex)
        setDisplayedNotifications((prevNotifications) => [
          ...prevNotifications,
          ...nextNotifications,
        ])
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  })

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
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false)

  const [hasNotifications, setHasNotifications] = useState<boolean>(true)

  const handleToggleNotifications = () => {
    setShowNotifications((showNotifications) => !showNotifications)
  }
  const handleOpenUserMenu = () => {
    setShowUserMenu((showUserMenu) => !showUserMenu)
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
                  onClick={() => handleNavigation('/')}
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
              <Image
                src='/images/bell.svg'
                alt='notifications'
                width={40}
                height={40}
              />
              {hasNotifications && (
                <span className='absolute top-0 right-0 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'></span>
              )}
            </button>
            {hasNotifications && showNotifications && (
              <div
                ref={containerRef}
                className='absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-4 max-h-60 overflow-y-auto'
              >
                {displayedNotifications?.map((notification) => (
                  <Notification notification={notification} />
                ))}
              </div>
            )}
            <button
              className='relative text-white focus:outline-none rounded-full p-2'
              onClick={handleOpenUserMenu}
            >
              <Image
                src='/images/profile.jpeg'
                alt='notifications'
                width={40}
                height={40}
                className='rounded-full'
              />
            </button>
            {showUserMenu && <UserMenu setShowUserMenu={setShowUserMenu} />}
          </div>
        </div>
      </div>
    </nav>
  )
}
