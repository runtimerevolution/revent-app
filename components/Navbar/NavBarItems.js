import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ProfileDropDown from 'components/Navbar/ProfileDropdown'
import PropTypes from 'prop-types'

const navigation = [
  { name: 'Photo Contests', href: '#', current: true },
  { name: 'Challenges', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBarItems = ({ open }) => {
  return (
    <div className='mx-auto  px-4 sm:px-6 lg:px-8'>
      <div className='flex h-16 justify-between'>
        <div className='flex'>
          <div className='-ml-2 mr-2 flex items-center md:hidden'>
            {/* Mobile menu button */}
            <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
              <span className='sr-only'>Open main menu</span>
              {open ? (
                <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
              )}
            </Disclosure.Button>
          </div>
          <div className='flex flex-shrink-0 items-center'>
            <a
              className='text-2xl font-bold text-orange-400  lg:text-3xl hover:text-orange-700 dark:hover:text-orange-500'
              href='#'
            >
              Cleek
            </a>
          </div>
          <div className='hidden md:ml-6 md:flex md:items-center md:space-x-4'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-orange-400 text-white'
                    : 'text-gray-500 hover:bg-orange-400',
                  'px-3 py-2 rounded-md text-sm font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <ProfileDropDown />
      </div>
    </div>
  )
}
export default NavBarItems

NavBarItems.propTypes = {
  open: PropTypes.any,
}
