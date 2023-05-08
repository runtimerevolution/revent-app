import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <nav className='bg-gray-800 w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <a
              onClick={() => handleNavigation('/')}
              className='text-white font-bold cursor-pointer'
            >
              Cleek
            </a>
          </div>
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-4'>
              <a
                onClick={() => handleNavigation('/about')}
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer'
              >
                About
              </a>
              <a
                onClick={() => handleNavigation('/contact')}
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer'
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
