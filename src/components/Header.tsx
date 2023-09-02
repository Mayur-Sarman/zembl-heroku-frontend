import { useCallback, useEffect, useState } from 'react'
import zemblLogo from '../assets/zembl.svg'

import { Navbar, IconButton, Collapse, Button } from '@material-tailwind/react'
import ContactUs from './ContactUs'
import { redirect } from 'react-router-dom'

const Header = () => {
  const [openNav, setOpenNav] = useState(false)

  const onLogoClickedHandler = useCallback(() => {
    redirect('/')
  }, [])

  const windowResizeListener = useCallback(() => {
    window.innerWidth >= 768 && setOpenNav(false)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', windowResizeListener)

    return () => {
      window.removeEventListener('resize', windowResizeListener)
    }
  }, [windowResizeListener])

  const contact = <ContactUs />

  return (
    <Navbar className="sticky px-6 top-0 z-10 h-max max-w-full border-0 rounded-none bg-zembl-p bg-opacity-100 md:px-8 md:py-4">
      <div className="flex items-center justify-between text-white">
        <Button onClick={onLogoClickedHandler} ripple className="bg-zembl-p rounded-md">
          <img src={zemblLogo} alt="Zembl" />
        </Button>
        <div className="flex items-center gap-4">
          <div className="hidden md:inline-block">{contact}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="mb-2 mt-4">{contact}</div>
      </Collapse>
    </Navbar>
  )
}

export default Header
