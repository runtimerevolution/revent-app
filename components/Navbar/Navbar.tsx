import { Disclosure } from '@headlessui/react'
import MobileMenu from './MobileMenu'
import NavBarItems from './NavBarItems'

export default function Navbar() {
  return (
    <Disclosure as='nav' className='bg-gray-100'>
      {({ open }) => (
        <>
          <NavBarItems open={open} />
          <MobileMenu />
        </>
      )}
    </Disclosure>
  )
}
