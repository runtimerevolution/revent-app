import { useRouter } from 'next/router'
import Image from 'next/image'

const Navbar = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const contestTextColor =
    router.pathname === '/contests' ? 'text-orange-500' : 'text-gray-700'

  const collectionsTextColor =
    router.pathname === '/collections' ? 'text-orange-500' : 'text-gray-700'

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
                  className={
                    router.pathname === '/contests'
                      ? `${contestTextColor} hover:bg-orange-700 hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer`
                      : `${contestTextColor} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer`
                  }
                >
                  Photo Contests
                </a>
                <a
                  onClick={() => handleNavigation('/#')}
                  className={
                    router.pathname === '/collections'
                      ? `${collectionsTextColor} hover:bg-orange-700 hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer`
                      : `${collectionsTextColor} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer`
                  }
                >
                  Collections
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
