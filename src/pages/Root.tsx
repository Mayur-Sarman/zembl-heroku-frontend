import { Outlet } from 'react-router-dom'
import { AlertContextProvider } from '../contexts'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Root() {
  return (
    <div className="max-h-screen h-screen w-full overflow-scroll flex flex-col">
      <Header />
      {/* <div className="mx-auto max-w-screen-md px-6 md:px-0 py-6 md:py-8 lg:py-12"> */}
      <div className="mx-auto w-full h-full">
        <AlertContextProvider>
          <Outlet />
        </AlertContextProvider>
      </div>
      <Footer />
    </div>
  )
}

export default Root
