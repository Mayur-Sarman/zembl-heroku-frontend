import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'

import { ThemeProvider } from '@material-tailwind/react'
import { ModalContextProvider } from './contexts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import appRoutes from './routes/appRoutes'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import { QueryClient, QueryClientProvider } from 'react-query'

const router = createBrowserRouter(appRoutes)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ModalContextProvider>
            <RouterProvider router={router} />
          </ModalContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
