import { Typography } from '@material-tailwind/react'
import PageWrapper from '../../components/PageWrapper'
import SimpleTable from '../../components/Tables/SimpleTable/SimpleTable'
import { DATA_TYPE_DATE, DATA_TYPE_TEXT } from '../../constants'
import { ColumnDefinition } from '../../components/Tables/types'
import HorizontalTable from '../../components/Tables/HorizontalTable/HorizontalTable'
import PageNavigationActions from '../../components/PageNavigationActions'

const SUPPLY_POINT_DETAIL_COLUMNS: ColumnDefinition[] = [
  { key: 'fuelType', type: DATA_TYPE_TEXT, label: 'Fuel Type' },
  { key: 'supplyPointNumber', type: DATA_TYPE_TEXT, label: 'Supply Point number (NMI/MIRN)' },
  { key: 'supplyPointAddress', type: DATA_TYPE_TEXT, label: 'Supply Point address' },
  { key: 'nextReZemblDate', type: DATA_TYPE_DATE, label: 'Next Re-Zembl Date', dateFormat: 'dd MMMM yyyy' },
]

const CUSTOMER_DETAIL_COLUMNS: ColumnDefinition[] = [
  { key: 'fullName', type: DATA_TYPE_TEXT, label: 'Contact person', headerClassName: 'w-1/2' },
  { key: 'legalName', type: DATA_TYPE_TEXT, label: 'Company name', headerClassName: 'w-1/2' },
  { key: 'abn', type: DATA_TYPE_TEXT, label: 'ABN', headerClassName: 'w-1/2' },
  { key: 'position', type: DATA_TYPE_TEXT, label: 'Position of contact person', headerClassName: 'w-1/2' },
  { key: 'mobileNumber', type: DATA_TYPE_TEXT, label: 'Telephone', headerClassName: 'w-1/2' },
  { key: 'email', type: DATA_TYPE_TEXT, label: 'Designated email address', headerClassName: 'w-1/2' },
]

const ReZemblDetailPage = () => {
  const customerFullName = 'James Test'

  return (
    <PageWrapper>
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
          data={[
            {
              fullName: 'James Test',
              legalName: 'Zembl Pty Ltd',
              abn: '29138847757',
              position: 'Managing Director',
              mobileNumber: '040000000',
              email: 'james@zembl.com.au',
            },
          ]}
          columns={CUSTOMER_DETAIL_COLUMNS}
          striped
          className="text-center"
        />

        <Typography className="text-zembl-p text-sm md:text-base">
          Details of Supply Points and Re-Zembl Dates
        </Typography>

        <SimpleTable
          data={[
            {
              fuelType: 'Electricity',
              supplyPointNumber: '70010185884',
              supplyPointAddress: '5/100 William Street',
              nextReZemblDate: new Date(),
            },
          ]}
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
