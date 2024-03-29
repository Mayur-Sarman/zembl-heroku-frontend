import { useNavigate } from 'react-router-dom'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useFetchQuoteListDataQuery } from '../../hooks/useQueryQuoteListData'

import {
    lazy,
    useContext 
} from 'react'
import {
    // ELECTRICITY_VALUE, GAS_VALUE, 
    // RegistrationData 
} from '../../constants'
// import AccordionCard from '../../components/AccordionCard'
import { Button } from '@material-tailwind/react'

import { Typography } from '@material-tailwind/react'
import ElectricIcon from '../../components/Icons/ElectricIcon'
import GasIcon from '../../components/Icons/GasIcon'
import { QuoteData } from '../../api/quote'

const PageWrapper = lazy(() => import('../../components/PageWrapper'))

const PlanSelectionPage = () => {
    const navigate = useNavigate()
    const { registrationData, registrationToken, setRegistrationData, handleErrorResponse } = useContext(RegistrationContext)

    const navigateNextPage = (token?: string) => {
        setRegistrationData((prev) => ({
            ...prev,
            quoteToken: token ? decodeURIComponent(token) : null
          }))
        navigate('/review-plan')
    }

    const getPlanListData = useFetchQuoteListDataQuery(
        { 
          quoteToken: registrationData?.quoteListToken as string, 
          token: registrationToken ?? '',
          isMultiSite: registrationData.multiSite === true ? registrationData.multiSite as boolean : false
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

    const cardHeader = (address?: string, electricType?: string, nmi?: string, mirn?: string, status?: string, token?: string) => {
        const energyMeterLabel = electricType === 'Electricity' ? 'NMI' : 'MIRN'
        const energyMeterNumber = electricType === 'Electricity' ? nmi : mirn
        const planTypeIcon = electricType === 'Electricity' ? <ElectricIcon className="min-w-[20px] min-h-[20px]"/> : <GasIcon className="min-w-[20px] min-h-[20px]"/>
        return (
            <div className="flex md:gap-6">
                <div className="md:w-[5%] flex items-center lg:flex-row gap-1 lg:gap-2">
                    {planTypeIcon ?? null}
                </div>

                <div className="flex items-center lg:flex-row md:w-[60%]">
                    <span className="flex items-center flex-col lg:flex-row gap-1 lg:gap-2">
                        <Typography variant="h6">Address</Typography>
                        <Typography className='lg:w-[400px] text-left' variant="paragraph">{address}</Typography>
                    </span>
                </div>
                <div className="flex items-center lg:flex-row md:w-[20%]">
                    <span className="flex flex-col lg:flex-row gap-1 lg:gap-2">
                        <Typography variant="h6">{energyMeterLabel}</Typography>
                        <Typography variant="paragraph">{energyMeterNumber}</Typography>
                    </span>
                </div>
                <div className="flex md:w-[15%] text-right block">
                    <Button
                        disabled={status === 'Accepted' ? true : false}
                        size="sm"
                        color={status === 'Accepted' ? 'gray' : 'green'}
                        className={`flex justify-center w-24 text-center flex m-auto capitalize ${status === 'Accepted' ? '' : '!zembl-btn'}`}
                        ripple={false}
                        
                        onClick={() => navigateNextPage(token)}>
                        {status === 'Accepted' ? 'Accepted' : 'Accept'}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <PageWrapper showLoading={getPlanListData.isLoading}>
            <form className="flex flex-col gap-6 w-full md:w-10/12 items-center">
                <Typography variant="h1" className="text-center text-zembl-p text-3xl lg:text-5xl">
                    Energy Plan Confirmation
                </Typography>
                <Typography variant="small" className="text-center text-zembl-p">
                    Please review and accept the below energy plans
                </Typography>
                {/* <AccordionCard open={false} alwaysOpen={false} title={cardHeader} bodyClassName="flex flex-col p-0">
            <></>
          </AccordionCard> */}
                <div 
                // className='overflow-y-auto h-[500px]'
                >
                    {registrationData.quoteList != null && Array.isArray(registrationData.quoteList) ?
                        registrationData.quoteList?.map((quote: QuoteData, index) => {
                            return (
                                <div key={index} className={'my-4 py-3 px-3 bg-zembl-s rounded-lg flex flex-col p-0 w-full text-black'}>
                                    {cardHeader(quote.address, quote.fuelType, quote.nmi, quote.mirn, quote.status, quote.token)}
                                </div>
                            )
                        }) : null
                    }
                </div>
            </form>
        </PageWrapper>
    )
}

export default PlanSelectionPage