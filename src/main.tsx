import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'

import { ThemeProvider } from '@material-tailwind/react'
import { ModalContextProvider } from './contexts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { GOOGLE_TAG_MANAGER_ID } from './constants'

import appRoutes from './routes/appRoutes'

import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from 'react-query'

import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: GOOGLE_TAG_MANAGER_ID,
}

TagManager.initialize(tagManagerArgs)

const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'))

const router = createBrowserRouter(appRoutes)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ModalContextProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <RouterProvider router={router} />
            </Suspense>
          </ModalContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
