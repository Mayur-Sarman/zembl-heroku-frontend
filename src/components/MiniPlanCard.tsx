import { Typography } from '@material-tailwind/react'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'

import ElectricIcon from './Icons/ElectricIcon'
import GasIcon from './Icons/GasIcon'

const MiniPlanCard = ({ energyType, brandIcon, planName }: MiniPlanCardProps) => {
  let energyTypeIcon = null

  switch (energyType) {
    case ELECTRICITY_VALUE:
      energyTypeIcon = <ElectricIcon />
      break
    case GAS_VALUE:
      energyTypeIcon = <GasIcon />
      break
  }

  return (
    <div className="flex gap-4 md:gap-6 items-start md:items-center">
      {energyTypeIcon}
      <div className="min-w-fit w-32 md:w-auto md:flex md:items-center md:gap-3">
        <img src={brandIcon} alt="Brand Icon" className="h-14 mr-auto" />
        <Typography variant="h6">{planName}</Typography>
      </div>
    </div>
  )
}

interface MiniPlanCardProps {
  energyType: string
  brandIcon: string
  planName: string
}

export default MiniPlanCard
