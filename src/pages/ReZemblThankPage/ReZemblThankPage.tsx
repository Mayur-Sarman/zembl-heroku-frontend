import { Button, Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'
import { useNavigate } from 'react-router-dom'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useFetchQuoteListDataQuery } from '../../hooks/useQueryQuoteListData'
import {
    useContext,
    lazy,
    useEffect
} from 'react'
import { QuoteData } from '../../api/quote'

const PageWrapper = lazy(() => import('../../components/PageWrapper'))

const ReZemblThankPage = () => {
  const navigate = useNavigate()
  const { registrationData, registrationToken, setRegistrationData, handleErrorResponse } = useContext(RegistrationContext)

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

  const handleNextButton = () => {
    if(registrationData.multiSite) {
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
    <div className="flex flex-col text-center h-full justify-center">
      <div className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0 w-full">
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <div className="flex flex-col gap-4 max-w-screen-md">
          <Typography className="text-center text-xl md:text-3xl font-normal text-zembl-p mb-4">
            Thanks for accepting Re-Zembl
          </Typography>
          <Typography className="text-center text-lg md:text-2xl font-semibold text-zembl-p mb-4">
            As a reminder
          </Typography>
          <Typography className="text-center text-base md:text-xl font-normal text-zembl-p mb-4">
            Re-Zembl is our free auto-renewal service for your energy contract.
          </Typography>
          <Typography className="text-center text-base md:text-xl font-normal text-zembl-p mb-4">
            As your 2-year anniversary approaches, we’ll automatically source a new competitive energy offer from our
            panel of retailers.
          </Typography>
        </div>
        <Button className="capitalize !zembl-btn m-auto" onClick={() => handleNextButton()}>
          Next
        </Button>
      </div>
    </div>
    </PageWrapper>
  )
}

export default ReZemblThankPage
