import Root from '../pages/Root'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import EnergyFormPage from '../pages/EnergyFormPage/EnergyFormPage'
import ZemblAssistPage from '../pages/ZemblAssistPage/ZemblAssistPage'
import ABNErrorPage from '../pages/ABNErrorPage/ABNErrorPage'
import BasicInfoPage from '../pages/BasicInfoPage/BasicInfoPage'
import BillUploadPage from '../pages/BillUploadPage/BillUploadPage'
import SelectPlansPage from '../pages/SelectPlansPage/SelectPlansPage'

const appRoutes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'energy', element: <EnergyFormPage /> },
      { path: 'zembl-assist', element: <ZemblAssistPage /> },
      { path: 'abn-error', element: <ABNErrorPage /> },
      { path: 'basic-info-1', element: <BasicInfoPage pageNo={1} /> },
      { path: 'basic-info-2', element: <BasicInfoPage pageNo={2} /> },
      { path: 'bill-upload', element: <BillUploadPage /> },
      { path: 'electricity-plans', element: <SelectPlansPage /> },
      { path: 'gas-plans', element: <SelectPlansPage /> },
      { path: 'plans', element: <SelectPlansPage /> },
      { path: '', element: <EnergyFormPage /> },
    ],
  },
]

export default appRoutes
