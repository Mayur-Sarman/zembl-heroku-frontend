import { Control } from 'react-hook-form'
import { NSW_VALUE, QLD_VALUE, SA_VALUE, VIC_VALUE } from '../../../../../constants'
import MomentumNewConnectionGas from './MomentumNewConnectionGas'
import MomentumNewConnectionNSW from './MomentumNewConnectionNSW'
import MomentumNewConnectionQLD from './MomentumNewConnectionQLD'
import MomentumNewConnectionSA from './MomentumNewConnectionSA'
import MomentumNewConnectionVIC from './MomentumNewConnectionVIC'

const MomentumNewConnection = ({
  control,
  state,
  powerAware,
  gasConnected,
  electricityConnectionPrice,
  gasConnectionPrice,
  gas,
  electricity,
}: MomentumNewConnectionProps) => {
  let display = null
  switch (state) {
    case NSW_VALUE.shortName:
      display = <MomentumNewConnectionNSW control={control} connectionPrice={electricityConnectionPrice} powerAware={powerAware} />
      break
    case VIC_VALUE.shortName:
      display = <MomentumNewConnectionVIC control={control} connectionPrice={electricityConnectionPrice} powerAware={powerAware} />
      break
    case SA_VALUE.shortName:
      display = <MomentumNewConnectionSA control={control} connectionPrice={electricityConnectionPrice} powerAware={powerAware} />
      break
    case QLD_VALUE.shortName:
      display = <MomentumNewConnectionQLD control={control} connectionPrice={electricityConnectionPrice} powerAware={powerAware} />
      break
  }

  if (gas)
    return <MomentumNewConnectionGas control={control} connectionPrice={gasConnectionPrice} powerAware={gasConnected} />
  return electricity ? display : null
}

interface MomentumNewConnectionProps {
  control: Control
  state: string
  powerAware: string
  gasConnected?: string
  electricityConnectionPrice?: string | null
  gasConnectionPrice?: string | null
  gas: boolean
  electricity: boolean
}

export default MomentumNewConnection
