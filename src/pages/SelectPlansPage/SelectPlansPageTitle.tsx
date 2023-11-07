import { Button, Typography } from '@material-tailwind/react'
import { BOTH_VALUE, ELECTRICITY_VALUE, GAS_VALUE } from '../../constants'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

const SelectPlansPageTitle = ({
  energyType,
  requestCallbackClick,
}: {
  energyType: string | undefined
  requestCallbackClick: () => unknown
}) => {
  let titleName = 'Electricity & Gas'

  switch (energyType) {
    case ELECTRICITY_VALUE:
      titleName = 'Electricity'
      break
    case GAS_VALUE:
      titleName = 'Gas'
      break
    case BOTH_VALUE:
      titleName = 'Electricity & Gas'
      break
  }
  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="flex flex-col gap-3 w-full my-2 items-center lg:my-4 lg:flex-row justify-between">
        <div className="text-center lg:text-left">
          <Typography className="text-zembl-p w-full font-normal text-3xl lg:font-medium md:text-5xl lg:w-auto whitespace-nowrap">
            {titleName ?? null}
          </Typography>
          <Typography className="text-zembl-p text-sm font-light lg:font-normal lg:text-xl max-w-lg">
            Here are the plans relevant to your selections
          </Typography>
        </div>
        <Button className="!zembl-btn border-solid border-black border" onClick={requestCallbackClick}>
        <Typography className="text-xs !font-normal flex justify-center gap-1">
        Want a more accurate quote?
        </Typography>
          
          <Typography className="text-xs !font-extrabold flex justify-center gap-1">
            Request a callback <InformationCircleIcon className="w-4 h-4 text-gray-500" />
          </Typography>
        </Button>
      </div>
    </div>
  )
}

export default SelectPlansPageTitle
