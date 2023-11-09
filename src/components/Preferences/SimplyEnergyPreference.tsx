import { Control } from 'react-hook-form'
import AccordionCard from '../AccordionCard'
import { useRegistration } from '../../hooks/useRegistration'
import ControllerSelectInput from '../Inputs/ControllerSelectInput'
import { SIMPLY_ENERGY_OPTIONS } from '../../constants'

const SimplyEnergyPreference = ({ control, prefix}: SimplyEnergyPreferenceProps) => {
  const {registrationData} = useRegistration()
  const word = registrationData?.billType ?? ''
  return (

    <AccordionCard alwaysOpen open title="Simply Energy Preferences" bodyClassName="flex-col text-left gap-y-6">

      <ControllerSelectInput
          control={control}
          name={`${prefix}.greenPowerOption`}
          label={`You have selected you want to receive your bills and other notices via ${word}`}
          textLabel={`You have selected you want to receive your bills and other notices via ${word}`}
          placeholder="Select..."
          options={SIMPLY_ENERGY_OPTIONS}
          required
        />
    </AccordionCard>
  )
}

interface SimplyEnergyPreferenceProps {
  control: Control
  siteAddress?: string
  prefix: string
  pref?: Record<string, string>
}

export default SimplyEnergyPreference
