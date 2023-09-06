import { Outlet } from 'react-router-dom'

import { AlertContextProvider } from '../contexts'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Root() {
  return (
    <div className="max-h-screen h-screen w-full overflow-scroll flex flex-col">
      <Header />
      <div className="mx-auto w-full min-h-fit flex-grow">
        <AlertContextProvider>
          <Outlet />
        </AlertContextProvider>
      </div>
      <Footer />
    </div>
  )
}

export default Root
