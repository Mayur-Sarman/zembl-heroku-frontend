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
import NoReZemblThankPage from '../pages/NoReZemblThankPage/NoReZemblThankPage'
import ReZemblThankPage from '../pages/ReZemblThankPage/ReZemblThankPage'
import ReviewPlanPage from '../pages/ReviewPlanPage/ReviewPlanPage'
import RetailerPreferencePage from '../pages/RetailerPreferencePage/RetailerPreferencePage'
import ReviewTermsPage from '../pages/ReviewTermsPage/ReviewTermsPage'
import RegistrationThankYouPage from '../pages/RegistrationThankYouPage/RegistrationThankYouPage'
import ReZemblDetailPage from '../pages/ReZemblDetailPage/ReZemblDetailPage'
import ReZemblTermsPage from '../pages/ReZemblTermsPage/ReZemblTermsPage'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { GOOGLE_RECAPTCHA_KEY } from '../constants'
import ZemblUploadPage from '../pages/ZemblUploadPage/ZemblUploadPage'

const wrappedEnergyPage = (
  <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_KEY}>
    <EnergyFormPage />
  </GoogleReCaptchaProvider>
)

const appRoutes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'zembl-assist', element: <ZemblAssistPage /> },
      { path: 'zembl-assist-upload', element: <ZemblUploadPage /> },
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
      { path: 'personal-detail-3', element: <PersonalDetailPage pageNo={3} /> },
      { path: 'plan-confirmation', element: <PlanConfirmationPage /> },
      { path: 'verification-code', element: <VerificationCodePage /> },
      // { path: 'review', element: <ReviewPage /> },
      { path: 'review-plan', element: <ReviewPlanPage /> },
      { path: 'preferences', element: <RetailerPreferencePage /> },
      { path: 'review-terms', element: <ReviewTermsPage /> },
      { path: 'rezembl-details', element: <ReZemblDetailPage /> },
      { path: 'rezembl-terms', element: <ReZemblTermsPage /> },
      { path: 'thank-you', element: <RegistrationThankYouPage /> },
      { path: 'rezembl-no-thank-you', element: <NoReZemblThankPage /> },
      { path: 'rezembl-thank-you', element: <ReZemblThankPage /> },
      { path: 'energy', element: wrappedEnergyPage },
      { path: '', element: wrappedEnergyPage },
    ],
  },
]

export default appRoutes
