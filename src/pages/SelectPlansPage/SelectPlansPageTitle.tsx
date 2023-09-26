import { Typography } from '@material-tailwind/react'
import { BOTH_VALUE, ELECTRICITY_VALUE, GAS_VALUE } from '../../constants'

const SelectPlansPageTitle = ({ energyType }: { energyType: string | undefined }) => {
  let titleName = null

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
      <div className="flex flex-col gap-3 w-full px-2 my-2 items-center lg:items-baseline lg:my-4 lg:flex-row">
        <Typography className="text-zembl-p w-full font-normal text-3xl lg:font-medium md:text-5xl lg:w-auto">
          {titleName ?? null}
        </Typography>
        <Typography className="text-zembl-p text-sm font-light lg:font-normal lg:text-xl max-w-lg">
          Here are the plans relevant to your selections
        </Typography>
      </div>
    </div>
  )
}

export default SelectPlansPageTitle
