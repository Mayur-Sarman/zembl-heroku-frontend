import { useCallback, useEffect, useState } from 'react'
import zemblLogo from '../assets/zembl.svg'

import { Navbar, IconButton, Collapse, Button } from '@material-tailwind/react'
import ContactUs from './ContactUs'
import { useNavigate } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'

const Header = () => {
  const navigate = useNavigate()
  const [openNav, setOpenNav] = useState(false)

  const onLogoClickedHandler = useCallback(() => {
    navigate('/')
  }, [navigate])

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
    <Navbar className="sticky px-6 top-0 z-20 h-max max-w-full border-0 rounded-none bg-zembl-p bg-opacity-100 md:px-8 md:py-4">
      <div className="flex items-center justify-between text-white">
        <Button onClick={onLogoClickedHandler} ripple className="bg-zembl-p rounded-md">
          <img src={zemblLogo} width={135} height={35} alt="Zembl" />
        </Button>
        <div className="flex items-center gap-4">
          <div className="hidden md:inline-block">{contact}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <XMarkIcon width={24} height={24} /> : <Bars3Icon width={24} height={24} />}
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
