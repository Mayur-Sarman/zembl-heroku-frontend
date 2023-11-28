import { lazy } from 'react'
import {
  AGL,
  BLUE_NRG,
  ENERGY_AU,
  ENERGY_LOCALS,
  MOMENTUM,
  NEXT_BUSINESS_ENERGY,
  SIMPLY_ENERGY,
} from '../../constants'
import { Control } from 'react-hook-form'

const AGLPreference = lazy(() => import('../../components/Preferences/AGLPreference'))
const BlueNRGPreference = lazy(() => import('../../components/Preferences/BlueNRGPreference'))
const SimplyEnergyPreference = lazy(() => import('../../components/Preferences/SimplyEnergyPreference'))
const EnergyAUPreference = lazy(() => import('../../components/Preferences/EnergyAUPreference'))
const EnergyLocalsPreference = lazy(() => import('../../components/Preferences/EnergyLocalsPreference'))
const MomentumEnergyPreference = lazy(() => import('../../components/Preferences/MomentumEnergyPreference'))
const NextBusinessEnergyPreference = lazy(() => import('../../components/Preferences/NextBusinessEnergyPreference'))

const RetailerPreferenceForm = ({ retailerName, prefix, control, siteAddress, pref }: RetailerPreferenceFormProps) => {
  switch (retailerName) {
    case AGL:
      return <AGLPreference control={control} prefix={prefix} />
    case BLUE_NRG:
      return <BlueNRGPreference control={control} prefix={prefix} pref={pref}/>
    case SIMPLY_ENERGY:
      return <SimplyEnergyPreference />
    case ENERGY_AU:
      return <EnergyAUPreference siteAddress={siteAddress} control={control} prefix={prefix} pref={pref}/>
    case ENERGY_LOCALS:
      return <EnergyLocalsPreference control={control} prefix={prefix} pref={pref}/>
    case MOMENTUM:
      return <MomentumEnergyPreference control={control} prefix={prefix} pref={pref}/>
    case NEXT_BUSINESS_ENERGY:
      return <NextBusinessEnergyPreference control={control} prefix={prefix} pref={pref}/>
  }
}

interface RetailerPreferenceFormProps {
  retailerName: string
  prefix: string
  control: Control
  siteAddress?: string
  pref?: Record<string, string>
}

export default RetailerPreferenceForm
