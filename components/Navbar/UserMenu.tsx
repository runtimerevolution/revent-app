import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'
import { TOKEN_KEY } from '../../api'

interface UserMenuProps {
  setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>
}
export default function UserMenu({ setShowUserMenu }: UserMenuProps) {
  const router = useRouter()
  const handleNavigation = (path: string) => {
    setShowUserMenu(false)
    router.push(path)
  }

  const logout = async (e) => {
    e.preventDefault()
    localStorage.removeItem(TOKEN_KEY)
    handleNavigation('/')
    window.location.reload()
  }
  return (
    <div className='w-48 absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-4 max-h-60 overflow-y-auto'>
      <ul>
        <button
          onClick={() => handleNavigation('/profile')}
          className='flex items-center mt-2'
        >
          <Image
            src='/images/profile.svg'
            alt='profile'
            width={40}
            height={40}
            className='mr-2'
          />
          <span>View Profile</span>
        </button>
        <button
          onClick={() => handleNavigation('/myphotos')}
          className='flex items-center mt-2'
        >
          <Image
            src='/images/myphotos.svg'
            alt='profile'
            width={40}
            height={40}
            className='mr-2'
          />
          <span>My Photos</span>
        </button>

        <button
          onClick={() => handleNavigation('/settings')}
          className='flex items-center mt-2'
        >
          <Image
            src='/images/settings.svg'
            alt='profile'
            width={40}
            height={40}
            className='mr-2'
          />
          <span>Settings</span>
        </button>
        <button onClick={logout} className='flex items-center mt-2'>
          <Image
            src='/images/signout.svg'
            alt='profile'
            width={40}
            height={40}
            className='mr-2'
          />
          <span>Sign Out</span>
        </button>
      </ul>
    </div>
  )
}
