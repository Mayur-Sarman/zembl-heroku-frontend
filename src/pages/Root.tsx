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
      <div className="mx-auto w-full min-h-fit flex-grow">
        <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_KEY}>
          <AlertContextProvider>
            <Outlet />
          </AlertContextProvider>
        </GoogleReCaptchaProvider>
      </div>
      <Footer />
    </div>
  )
}

export default Root
