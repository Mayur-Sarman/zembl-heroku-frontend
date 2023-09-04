import Root from '../pages/Root'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import EnergyFormPage from '../pages/EnergyFormPage/EnergyFormPage'
import ZemblAssistPage from '../pages/ZemblAssistPage/ZemblAssistPage'
import ABNErrorPage from '../pages/ABNErrorPage/ABNErrorPage'

const appRoutes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'energy',
        element: <EnergyFormPage />,
      },
      {
        path: 'zembl-assist',
        element: <ZemblAssistPage />,
      },
      {
        path: 'abn-error',
        element: <ABNErrorPage />,
      },
      {
        path: '',
        element: <EnergyFormPage />,
      },
    ],
  },
]

export default appRoutes
