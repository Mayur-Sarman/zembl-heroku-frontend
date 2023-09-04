import { Outlet } from 'react-router-dom'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { GOOGLE_RECAPTCHA_KEY } from '../constants'

import { AlertContextProvider } from '../contexts'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Root() {
  return (
    <div className="max-h-screen h-screen w-full overflow-scroll flex flex-col">
      <Header />
      {/* <div className="mx-auto max-w-screen-md px-6 md:px-0 py-6 md:py-8 lg:py-12"> */}
      <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_KEY}>
        <AlertContextProvider>
          <div className="mx-auto w-full min-h-fit h-full">
            <Outlet />
          </div>
        </AlertContextProvider>
      </GoogleReCaptchaProvider>
      <Footer />
    </div>
  )
}

export default Root
