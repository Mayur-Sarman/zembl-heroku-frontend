import { Typography } from '@material-tailwind/react'
import PageWrapper from '../../components/PageWrapper'
import SimpleTable from '../../components/Tables/SimpleTable/SimpleTable'
import { DATA_TYPE_DATE, DATA_TYPE_TEXT } from '../../constants'
import { ColumnDefinition } from '../../components/Tables/types'
import HorizontalTable from '../../components/Tables/HorizontalTable/HorizontalTable'
import PageNavigationActions from '../../components/PageNavigationActions'
import { useRegistration } from '../../hooks/useRegistration'
import { useReZemblQuery } from '../../hooks/useReZemblQuery'
import { CustomerDetails, ReZemblData, ReZemblRequestPayload } from '../../api/reZembl'
import { useToast } from '../../hooks'

const SUPPLY_POINT_DETAIL_COLUMNS: ColumnDefinition[] = [
  { key: 'fuelType', type: DATA_TYPE_TEXT, label: 'Fuel Type' },
  { key: 'nmi', type: DATA_TYPE_TEXT, label: 'Supply Point number (NMI/MIRN)' },
  { key: 'address', type: DATA_TYPE_TEXT, label: 'Supply Point address' },
  { key: 'nextReZemblDate', type: DATA_TYPE_DATE, label: 'Next Re-Zembl Date', dateFormat: 'dd MMMM yyyy' },
]

const CUSTOMER_DETAIL_COLUMNS: ColumnDefinition[] = [
  { key: 'contactPerson', type: DATA_TYPE_TEXT, label: 'Contact person', headerClassName: 'w-1/2' },
  { key: 'companyName', type: DATA_TYPE_TEXT, label: 'Company name', headerClassName: 'w-1/2' },
  { key: 'abn', type: DATA_TYPE_TEXT, label: 'ABN', headerClassName: 'w-1/2' },
  { key: 'position', type: DATA_TYPE_TEXT, label: 'Position of contact person', headerClassName: 'w-1/2' },
  { key: 'telephone', type: DATA_TYPE_TEXT, label: 'Telephone', headerClassName: 'w-1/2' },
  { key: 'designatedEmail', type: DATA_TYPE_TEXT, label: 'Designated email address', headerClassName: 'w-1/2' },
]

const ReZemblDetailPage = () => {
  const { fireAlert } = useToast()
  const { registrationData, setRegistrationData, registrationToken } = useRegistration()

  const quoteData: ReZemblRequestPayload = {
    electricityQuoteId: registrationData?.electricityQuote?.quoteId,
    gasQuoteId: registrationData?.gasQuote?.quoteId,
  }
  const reZemblDataQuery = useReZemblQuery(quoteData, registrationToken ?? '', {
    onSuccess: (reZemblData: ReZemblData) => {
      setRegistrationData((prev) => ({ ...prev, ...reZemblData }))
    },
    onError: () => {
      fireAlert({ children: 'Unfortunately, we cannot get your quote.', type: 'error' })
    },
  })
  const customerFullName = (registrationData?.customerDetails as CustomerDetails)?.contactPerson ?? ''

  return (
    <PageWrapper showLoading={reZemblDataQuery.isLoading}>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-y-1">
          <Typography variant="h4" className="text-zembl-p">
            Customer Details Schedule
          </Typography>
          <Typography variant="small" className="text-zembl-p">
            Customer full name: {customerFullName}
          </Typography>
        </div>
        <hr />

        <HorizontalTable
          data={registrationData?.customerDetails ? [registrationData.customerDetails] : []}
          columns={CUSTOMER_DETAIL_COLUMNS}
          striped
          className="text-center"
        />

        <Typography className="text-zembl-p text-sm md:text-base">
          Details of Supply Points and Re-Zembl Dates
        </Typography>

        <SimpleTable
          data={registrationData?.electricityQuote ? [registrationData.electricityQuote] : []}
          columns={SUPPLY_POINT_DETAIL_COLUMNS}
          className="text-center h-15"
          stickyHeader
        />

        <PageNavigationActions nextLink="/rezembl-terms" nextLabel="View and accept terms" hidePrev />
      </div>
    </PageWrapper>
  )
}

export default ReZemblDetailPage
