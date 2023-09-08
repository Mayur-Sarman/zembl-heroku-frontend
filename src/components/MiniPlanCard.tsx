import { Typography } from '@material-tailwind/react'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'

import electricIcon from '../assets/electricity.svg'
import gasIcon from '../assets/gas.svg'

const MiniPlanCard = ({ energyType, brandIcon, planName }: MiniPlanCardProps) => {
  let energyTypeIcon = null

  switch (energyType) {
    case ELECTRICITY_VALUE:
      energyTypeIcon = electricIcon
      break
    case GAS_VALUE:
      energyTypeIcon = gasIcon
      break
  }

  return (
    <div className="flex gap-6 items-center">
      {energyTypeIcon ? <img src={energyTypeIcon} alt="Energy Plan Icon" className="w-14 h-14" /> : null}
      <img src={brandIcon} alt="Brand Icon" className="h-14" />
      <Typography variant="h6">{planName}</Typography>
    </div>
  )
}

interface MiniPlanCardProps {
  energyType: string
  brandIcon: string
  planName: string
}

export default MiniPlanCard
