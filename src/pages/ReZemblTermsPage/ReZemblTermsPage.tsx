import { FieldValues, useForm } from 'react-hook-form'
import ReZemblTermForm from '../../components/Forms/ReZemblTermForm'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'
import PageNavigationActions from '../../components/PageNavigationActions'
import { Typography } from '@material-tailwind/react'
import { useRegistration } from '../../hooks/useRegistration'
import { UpdateReZemblTermsConsentPayload } from '../../api/reZembl'
import { useReZemblTermsMutation } from '../../hooks/useReZemblTermsMutation'
import { useToast } from '../../hooks'

const ReZemblTermsPage = () => {
  const { fireAlert } = useToast()
  const { registrationData, registrationToken } = useRegistration()
  const navigate = useNavigate()

  // On load page get data from context
  const { handleSubmit, register } = useForm()

  const consentReZemblTerm = useReZemblTermsMutation(registrationToken ?? '', {
    onSuccess: () => navigate('/rezembl-thank-you'),
    onError: () => {
      fireAlert({ children: 'Could not update consent, please try again.', type: 'error' })
    },
  })

  const onSubmit = (data: FieldValues) => {
    console.log(data)
    const rezemblConsentPayload: UpdateReZemblTermsConsentPayload = {
      electricityQuoteId: registrationData?.electricityQuote?.quoteId,
      gasQuoteId: registrationData?.gasQuote?.quoteId,
      reZemblConsent: true,
    }

    consentReZemblTerm.mutate(rezemblConsentPayload)
  }

  return (
    <PageWrapper>
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
