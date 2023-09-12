import Root from '../pages/Root'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import EnergyFormPage from '../pages/EnergyFormPage/EnergyFormPage'
import ZemblAssistPage from '../pages/ZemblAssistPage/ZemblAssistPage'
import ABNErrorPage from '../pages/ABNErrorPage/ABNErrorPage'
import BasicInfoPage from '../pages/BasicInfoPage/BasicInfoPage'
import BillUploadPage from '../pages/BillUploadPage/BillUploadPage'
import SelectPlansPage from '../pages/SelectPlansPage/SelectPlansPage'
import PersonalDetailPage from '../pages/PersonalDetailPage/PersonalDetailPage'
import PlanConfirmationPage from '../pages/PlanConfirmationPage/PlanConfirmationPage'
import VerificationCodePage from '../pages/VerificationCodePage/VerificationCodePage'
import ReviewPage from '../pages/ReviewPage/ReviewPage'
import NoReZemblThankPage from '../pages/NoReZemblThankPage/NoReZemblThankPage'
import ReZemblThankPage from '../pages/ReZemblThankPage/ReZemblThankPage'
import ReviewPlanPage from '../pages/ReviewPlanPage/ReviewPlanPage'
import RetailerPreferencePage from '../pages/RetailerPreferencePage/RetailerPreferencePage'

const appRoutes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'energy', element: <EnergyFormPage /> },
      { path: 'zembl-assist', element: <ZemblAssistPage /> },
      { path: 'abn-error', element: <ABNErrorPage /> },
      { path: 'nmi-mirn-error', element: <ABNErrorPage /> },
      { path: 'basic-info-1', element: <BasicInfoPage pageNo={1} /> },
      { path: 'basic-info-2', element: <BasicInfoPage pageNo={2} /> },
      { path: 'bill-upload', element: <BillUploadPage /> },
      { path: 'electricity-plans', element: <SelectPlansPage /> },
      { path: 'gas-plans', element: <SelectPlansPage /> },
      { path: 'plans', element: <SelectPlansPage /> },
      { path: 'personal-detail-1', element: <PersonalDetailPage pageNo={1} /> },
      { path: 'personal-detail-2', element: <PersonalDetailPage pageNo={2} /> },
      { path: 'plan-confirmation', element: <PlanConfirmationPage /> },
      { path: 'verification-code', element: <VerificationCodePage /> },
      { path: 'review', element: <ReviewPage /> },
      { path: 'review-plan', element: <ReviewPlanPage /> },
      { path: 'preferences', element: <RetailerPreferencePage /> },
      { path: 'rezembl-no-thank-you', element: <NoReZemblThankPage /> },
      { path: 'rezembl-thank-you', element: <ReZemblThankPage /> },
      { path: '', element: <EnergyFormPage /> },
    ],
  },
]

export default appRoutes
