import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLogout } from 'hooks/auth'

interface UserMenuProps {
  setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>
  showUserMenu: boolean
}
export default function UserMenu({ setShowUserMenu, showUserMenu }: UserMenuProps) {
  const router = useRouter()
  const handleNavigation = (path: string) => {
    setShowUserMenu(false)
    router.push(path)
  }

  const { mutate } = useLogout()
  const [mouseOut, setMouseOut] = useState(false)

  const logout = async (e) => {
    mutate()
    e.preventDefault()
    handleNavigation('/')
    window.location.reload()
  }

  useEffect(() => {
    if (!mouseOut) return;
    function handleClick(event) {
      setShowUserMenu(false);
    }
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [mouseOut]);

  return (
    <div className='absolute bottom-0 right-48'>
      <div className='flex relative'>
        <div
          onMouseOut={() => setMouseOut(true)}
          onMouseEnter={() => setMouseOut(false)}
          className='w-48 absolute -top-2 z-20 bg-white text-gray-800 rounded-lg shadow-lg p-4 max-h-60'
        >
          <ul>
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
      </div>
    </div>
  )
}
