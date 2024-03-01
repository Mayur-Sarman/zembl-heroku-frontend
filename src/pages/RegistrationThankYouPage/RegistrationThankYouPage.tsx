import { Button, Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'
import { useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { YES_VALUE } from '../../constants'
// import { useRegistration } from '../../hooks/useRegistration'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useFetchQuoteListDataQuery } from '../../hooks/useQueryQuoteListData'
import {
    useContext,
    lazy,
    useEffect
} from 'react'
import { QuoteData } from '../../api/quote'

const ReZemblForm = lazy(() => import('../../components/Forms/PersonalDetails/ReZemblForm'))
const PageWrapper = lazy(() => import('../../components/PageWrapper'))

const RegistrationThankYouPage = () => {
  const navigate = useNavigate()
  const { registrationData, registrationToken, setRegistrationData, handleErrorResponse } = useContext(RegistrationContext)
  const { handleSubmit, control } = useForm()

  const getPlanListData = useFetchQuoteListDataQuery(
    { 
      quoteToken: registrationData?.quoteListToken as string, 
      token: registrationToken ?? '' 
    },
    {
      onSuccess: (data: QuoteData[]) => {
        // console.log('data =>', data)
        setRegistrationData((prev) => ({
          ...prev,
          quoteList: data
        }))
      },
      onError: (error) => {
        handleErrorResponse(error, 'Unfortunately, we cannot find your quote.')
      },
    },
  )

  const onSubmit = (data: FieldValues) => {
    if (data.reZembl === YES_VALUE) {
        navigate('/rezembl-details')
    } else if(registrationData.multiSite) {
        let isAllAccepted = true
        if(registrationData.quoteList != null && Array.isArray(registrationData.quoteList)) {
          registrationData.quoteList.forEach((quote: QuoteData) => {
            if(quote?.status !== 'Accepted') {
              isAllAccepted = false
            }
          })
        }
  
        if(isAllAccepted) {
          navigate('/rezembl-no-thank-you')
        } else {
          navigate('/plan-selection')
        }

      } else {
        navigate('/rezembl-no-thank-you')
      }
    }

    useEffect(() => {
      const fetchData = async () => {
        await getPlanListData.refetch()
      }
      if(registrationData.multiSite) {
        fetchData().catch(error => console.log(error))
      }
    }, [])

  return (
    <PageWrapper showLoading={getPlanListData.isLoading}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12 items-center">
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <div className="flex flex-col gap-4 max-w-screen-md">
          <Typography className="text-center text-base md:text-4xl font-normal text-zembl-p mb-4">
            Thanks for Zembling your energy rates
          </Typography>
        </div>
        <ReZemblForm control={control} />
        <Button type='submit' className="capitalize !zembl-btn m-auto w-full lg:w-1/4">
          Continue
        </Button>
      </form>
    </PageWrapper>
  )
}

export default RegistrationThankYouPage
