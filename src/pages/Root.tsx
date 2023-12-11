import { Outlet } from 'react-router-dom'

import { AlertContextProvider } from '../contexts'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { RegistrationContextProvider } from '../contexts/RegistrationContext'
import ScrollToTop from '../components/ScrollToTop'

function Root() {
  return (
    <div className="max-h-screen h-screen w-full flex flex-col">
      <Header />
      <div className="mx-auto w-full min-h-fit flex-grow">
        <AlertContextProvider>
          <RegistrationContextProvider>
            <Outlet />
            <ScrollToTop />
          </RegistrationContextProvider>
        </AlertContextProvider>
      </div>
      <Footer />
    </div>
  )
}

export default Root
