import { Control } from 'react-hook-form'
import { NSW_VALUE, QLD_VALUE, SA_VALUE, VIC_VALUE } from '../../../../../constants'
import SENewConnectionNSW from './SENewConnectionNSW'
import SENewConnectionVIC from './SENewConnectionVIC'
import SENewConnectionQLD from './SENewConnectionQLD'
import SENewConnectionSA from './SENewConnectionSA'

const SENewConnection = ({ control, powerAware, state, electricPrice, gasPrice }: SENewConnectionProps) => {
  const priceText = `${electricPrice ? `${electricPrice ?? '$0'} for electricity` : ''} ${
    electricPrice && gasPrice ? 'and' : ''
  } ${gasPrice ? `${gasPrice ?? '$0'} for gas` : ''}`

  let display = null
  switch (state) {
    case NSW_VALUE.shortName:
      display = <SENewConnectionNSW control={control} priceText={priceText} powerAware={powerAware} />
      break
    case VIC_VALUE.shortName:
      display = <SENewConnectionVIC control={control} priceText={priceText} powerAware={powerAware} />
      break
    case QLD_VALUE.shortName:
      display = <SENewConnectionQLD control={control} priceText={priceText} powerAware={powerAware} />
      break
    case SA_VALUE.shortName:
      display = <SENewConnectionSA control={control} priceText={priceText} powerAware={powerAware} />
      break
  }
  return display
}

interface SENewConnectionProps {
  control: Control
  powerAware: string
  state?: string
  electricPrice?: string | null
  gasPrice?: string | null
}

export default SENewConnection
