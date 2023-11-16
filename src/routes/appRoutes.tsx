/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { GOOGLE_RECAPTCHA_KEY } from '../constants'

const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage'))
const Root = lazy(() => import('../pages/Root'))
const EnergyFormPage = lazy(() => import('../pages/EnergyFormPage/EnergyFormPage'))
const ZemblAssistPage = lazy(() => import('../pages/ZemblAssistPage/ZemblAssistPage'))
const ABNErrorPage = lazy(() => import('../pages/ABNErrorPage/ABNErrorPage'))
const BasicInfoPage = lazy(() => import('../pages/BasicInfoPage/BasicInfoPage'))
const BillUploadPage = lazy(() => import('../pages/BillUploadPage/BillUploadPage'))
const SelectPlansPage = lazy(() => import('../pages/SelectPlansPage/SelectPlansPage'))
const PersonalDetailPage = lazy(() => import('../pages/PersonalDetailPage/PersonalDetailPage'))
const PlanConfirmationPage = lazy(() => import('../pages/PlanConfirmationPage/PlanConfirmationPage'))
const VerificationCodePage = lazy(() => import('../pages/VerificationCodePage/VerificationCodePage'))
const NoReZemblThankPage = lazy(() => import('../pages/NoReZemblThankPage/NoReZemblThankPage'))
const ReZemblThankPage = lazy(() => import('../pages/ReZemblThankPage/ReZemblThankPage'))
const ReviewPlanPage = lazy(() => import('../pages/ReviewPlanPage/ReviewPlanPage'))
const RetailerPreferencePage = lazy(() => import('../pages/RetailerPreferencePage/RetailerPreferencePage'))
const ReviewTermsPage = lazy(() => import('../pages/ReviewTermsPage/ReviewTermsPage'))
const RegistrationThankYouPage = lazy(() => import('../pages/RegistrationThankYouPage/RegistrationThankYouPage'))
const ReZemblDetailPage = lazy(() => import('../pages/ReZemblDetailPage/ReZemblDetailPage'))
const ReZemblTermsPage = lazy(() => import('../pages/ReZemblTermsPage/ReZemblTermsPage'))
const ZemblUploadPage = lazy(() => import('../pages/ZemblUploadPage/ZemblUploadPage'))

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
      { path: 'quoting-error', element: <ABNErrorPage /> },
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
