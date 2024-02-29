/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { GOOGLE_RECAPTCHA_KEY } from '../constants'
import { Spinner } from '@material-tailwind/react'

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
const PlanSelectionPage = lazy(() => import('../pages/PlanSelectionPage/PlanSelectionPage'))

const wrappedEnergyPage = (
  <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_KEY}>
    <EnergyFormPage />
  </GoogleReCaptchaProvider>
)

const spinnerFallback = (
  <div className="w-full h-full absolute z-50 top-0 left-0 backdrop-blur-sm flex items-center justify-center">
    <Spinner className="h-16 w-16 m-auto absolute opacity-100" />
    <div className="mt-28">
      <p className="text-black">{'Please Wait'}</p>
    </div>
  </div>
)

const appRoutes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'zembl-assist',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ZemblAssistPage />
          </Suspense>
        ),
      },
      {
        path: 'zembl-assist-upload',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ZemblUploadPage />
          </Suspense>
        ),
      },
      {
        path: 'abn-error',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ABNErrorPage />
          </Suspense>
        ),
      },
      {
        path: 'nmi-mirn-error',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ABNErrorPage />
          </Suspense>
        ),
      },
      {
        path: 'quoting-error',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ABNErrorPage />
          </Suspense>
        ),
      },
      {
        path: 'basic-info-1',
        element: (
          <Suspense fallback={spinnerFallback}>
            <BasicInfoPage pageNo={1} />
          </Suspense>
        ),
      },
      {
        path: 'basic-info-2',
        element: (
          <Suspense fallback={spinnerFallback}>
            <BasicInfoPage pageNo={2} />
          </Suspense>
        ),
      },
      {
        path: 'bill-upload',
        element: (
          <Suspense fallback={spinnerFallback}>
            <BillUploadPage />
          </Suspense>
        ),
      },
      {
        path: 'electricity-plans',
        element: (
          <Suspense fallback={spinnerFallback}>
            <SelectPlansPage />
          </Suspense>
        ),
      },
      {
        path: 'gas-plans',
        element: (
          <Suspense fallback={spinnerFallback}>
            <SelectPlansPage />
          </Suspense>
        ),
      },
      {
        path: 'plans',
        element: (
          <Suspense fallback={spinnerFallback}>
            <SelectPlansPage />
          </Suspense>
        ),
      },
      {
        path: 'personal-detail-1',
        element: (
          <Suspense fallback={spinnerFallback}>
            <PersonalDetailPage pageNo={1} />
          </Suspense>
        ),
      },
      {
        path: 'personal-detail-2',
        element: (
          <Suspense fallback={spinnerFallback}>
            <PersonalDetailPage pageNo={2} />
          </Suspense>
        ),
      },
      {
        path: 'personal-detail-3',
        element: (
          <Suspense fallback={spinnerFallback}>
            <PersonalDetailPage pageNo={3} />
          </Suspense>
        ),
      },
      {
        path: 'plan-confirmation',
        element: (
          <Suspense fallback={spinnerFallback}>
            <PlanConfirmationPage />
          </Suspense>
        ),
      },
      {
        path: 'verification-code',
        element: (
          <Suspense fallback={spinnerFallback}>
            <VerificationCodePage />
          </Suspense>
        ),
      },
      // { path: 'review', element: <Suspense fallback={spinnerFallback}><ReviewPage /></Suspense> },
      {
        path: 'review-plan',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ReviewPlanPage />
          </Suspense>
        ),
      },
      {
        path: 'preferences',
        element: (
          <Suspense fallback={spinnerFallback}>
            <RetailerPreferencePage />
          </Suspense>
        ),
      },
      {
        path: 'review-terms',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ReviewTermsPage />
          </Suspense>
        ),
      },
      {
        path: 'rezembl-details',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ReZemblDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'rezembl-terms',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ReZemblTermsPage />
          </Suspense>
        ),
      },
      {
        path: 'thank-you',
        element: (
          <Suspense fallback={spinnerFallback}>
            <RegistrationThankYouPage />
          </Suspense>
        ),
      },
      {
        path: 'rezembl-no-thank-you',
        element: (
          <Suspense fallback={spinnerFallback}>
            <NoReZemblThankPage />
          </Suspense>
        ),
      },
      {
        path: 'rezembl-thank-you',
        element: (
          <Suspense fallback={spinnerFallback}>
            <ReZemblThankPage />
          </Suspense>
        ),
      },
      { path: 'energy', element: wrappedEnergyPage },
      { path: '', element: wrappedEnergyPage },
      {
        path: 'plan-selection',
        element: (
          <Suspense fallback={spinnerFallback}>
            <PlanSelectionPage />
          </Suspense>
        ),
      }
    ],
  },
]

export default appRoutes
