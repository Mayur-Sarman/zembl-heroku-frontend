import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import { useRegistration } from '../../hooks/useRegistration'
import { UpdateReZemblTermsConsentPayload } from '../../api/reZembl'
import { useReZemblTermsMutation } from '../../hooks/useReZemblTermsMutation'
import { ZEMBL_DEBUG_MODE } from '../../constants/misc'
import { lazy } from 'react'

const ReZemblTermForm = lazy(() => import('../../components/Forms/ReZemblTermForm'))
const PageWrapper = lazy(() => import('../../components/PageWrapper'))
const PageNavigationActions = lazy(() => import('../../components/PageNavigationActions'))

const ReZemblTermsPage = () => {
  const { registrationData, registrationToken, handleErrorResponse } = useRegistration()
  const navigate = useNavigate()
  // console.log('registrationData rezeml T&C =>' , registrationData)
  // On load page get data from context
  const { handleSubmit, register } = useForm()

  const consentReZemblTerm = useReZemblTermsMutation(registrationToken ?? '', {
    onSuccess: () => navigate('/rezembl-thank-you'),
    onError: (error) => {
      if (ZEMBL_DEBUG_MODE) console.log('REVIEW_RE_ZEMBL_MID_PAGE', error)
      handleErrorResponse(error)
    },
  })

  const onSubmit = () => {
    const rezemblConsentPayload: UpdateReZemblTermsConsentPayload = {
      electricityQuoteId: registrationData?.electricityQuote?.quoteId,
      gasQuoteId: registrationData?.gasQuote?.quoteId,
      accountId: registrationData?.accountDetails?.accountId ?? registrationData?.businessDetails?.accountId,
      reZemblConsent: true,
    }

    consentReZemblTerm.mutate(rezemblConsentPayload)
  }

  return (
    <PageWrapper showLoading={consentReZemblTerm?.isLoading}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <ReZemblTermForm
          register={register}
          zemblElectric={registrationData?.electricityQuote}
          zemblGas={registrationData?.gasQuote}
        />
        <PageNavigationActions hidePrev nextLabel="Submit application" />
        <Typography className="text-xs text-zembl-p">
          Note: By submitting this application, you acknowledge that you have read and agree to the terms and conditions
          of this offer.
        </Typography>
      </form>
    </PageWrapper>
  )
}

export default ReZemblTermsPage
