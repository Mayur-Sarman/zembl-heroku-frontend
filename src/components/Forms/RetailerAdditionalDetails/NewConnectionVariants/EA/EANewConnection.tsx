import { Control } from 'react-hook-form'
import { ACT_VALUE, NSW_VALUE, QLD_VALUE, SA_VALUE, VIC_VALUE } from '../../../../../constants'
import EANewConnectionVIC from './EANewConnectionVIC'
import EANewConnectionQLD from './EANewConnectionQLD'
import EANewConnectionNSW from './EANewConnectionNSW'
import EANewConnectionSA from './EANewConnectionSA'
import EANewConnectionACT from './EANewConnectionACT'
import { formatCurrency } from '../../../../../helpers/formatter'

const EANewConnection = ({
  control,
  powerAware,
  electricPrice,
  gasPrice,
  state,
  accessMethod,
}: EANewConnectionProps) => {
  const priceText = `${electricPrice ? `electricity is ${formatCurrency(electricPrice)}` : ''} ${
    electricPrice && gasPrice ? 'and' : ''
  } ${
    gasPrice ? `gas is ${state === VIC_VALUE.shortName ? 'up to ' : ''}${formatCurrency(gasPrice)}` : ''
  } including GST`

  const commonPowerOnText = `The connection fee for your ${priceText}, which will appear on your first bill. A technician will require clear access to the main switch and/or meter. Please ensure there are no access restrictions such as locked gates and unrestrained animals as you may be charged additional fees if the provider incurs additional costs.`
  const commonPowerOffText = `To ensure your power is connected, you must make sure the main switch is turned off prior to the connection date. ${commonPowerOnText}`

  let display = null

  switch (state) {
    case VIC_VALUE.shortName:
      display = (
        <EANewConnectionVIC
          control={control}
          powerAware={powerAware}
          powerOnText={commonPowerOnText}
          powerOffText={commonPowerOffText}
        />
      )
      break
    case QLD_VALUE.shortName:
      display = (
        <EANewConnectionQLD
          control={control}
          powerAware={powerAware}
          accessMethod={accessMethod}
          powerOnText={commonPowerOnText}
        />
      )
      break
    case NSW_VALUE.shortName:
      display = (
        <EANewConnectionNSW
          control={control}
          powerAware={powerAware}
          powerOnText={commonPowerOnText}
          powerOffText={commonPowerOffText}
        />
      )
      break
    case SA_VALUE.shortName:
      display = (
        <EANewConnectionSA
          control={control}
          powerAware={powerAware}
          powerOnText={commonPowerOnText}
          powerOffText={commonPowerOffText}
        />
      )
      break
    case ACT_VALUE.shortName:
      display = (
        <EANewConnectionACT
          control={control}
          powerAware={powerAware}
          powerOnText={commonPowerOnText}
          electricPrice={electricPrice ?? NaN}
          gasPrice={gasPrice ?? NaN}
        />
      )
      break
  }

  return display
}

interface EANewConnectionProps {
  control: Control
  powerAware: string
  electricPrice: number | null
  gasPrice: number | null
  state: string
  accessMethod: string
}

export default EANewConnection
