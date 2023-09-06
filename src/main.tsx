import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'

import { ThemeProvider } from '@material-tailwind/react'
import { ModalContextProvider } from './contexts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import appRoutes from './routes/appRoutes'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import { RegistrationContextProvider } from './contexts/RegistrationContext'

const router = createBrowserRouter(appRoutes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <ThemeProvider>
        <ModalContextProvider>
          <RegistrationContextProvider>
            <RouterProvider router={router} />
          </RegistrationContextProvider>
        </ModalContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
