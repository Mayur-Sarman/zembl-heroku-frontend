import { useForm } from 'react-hook-form'
import ReZemblTermForm from '../../components/Forms/ReZemblTermForm'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'
import PageNavigationActions from '../../components/PageNavigationActions'
import { Typography } from '@material-tailwind/react'
import { useRegistration } from '../../hooks/useRegistration'
import { UpdateReZemblTermsConsentPayload } from '../../api/reZembl'
import { useReZemblTermsMutation } from '../../hooks/useReZemblTermsMutation'
import { ZEMBL_DEBUG_MODE } from '../../constants/misc'

const ReZemblTermsPage = () => {
  const { registrationData, registrationToken, handleErrorResponse } = useRegistration()
  const navigate = useNavigate()

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
      reZemblConsent: true,
    }

    consentReZemblTerm.mutate(rezemblConsentPayload)
  }

  return (
    <PageWrapper showLoading={consentReZemblTerm?.isLoading}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <ReZemblTermForm
          register={register}
          zemblElectricTerms={registrationData?.electricityQuote?.termAndConditionContent ?? ''}
          zemblGasTerms={registrationData?.gasQuote?.termAndConditionContent ?? ''}
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
