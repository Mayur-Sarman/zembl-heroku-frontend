import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { GREEN_POWER_OPTIONS, YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import ControllerSelectInput from '../Inputs/ControllerSelectInput'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'
import { useRegistration } from '../../hooks/useRegistration'

const EnergyAUPreference = ({ siteAddress, control, prefix, pref, isElectric }: EnergyAUPreferenceProps) => {
  const {registrationData} = useRegistration()
  // Post && (!registrationData.fullAddress?.includes('ACT') || Gas)
  return (
    <AccordionCard alwaysOpen open title="Energy Australia Preferences" bodyClassName="flex-col text-left gap-y-6">
      {registrationData.fullAddress?.includes('ACT') && isElectric ? 
        <ControllerRadioGroupInput
          control={control}
          name={`${prefix}.interestedGreenPower`}
          label={`For the electricity at ${
            siteAddress ?? ''
          }, are you interested in Greenpower for an additional charge?`}
          options={YES_NO_OPTIONS}
          required
        />
      : null}
      

      {/* <TextNote>You have indicated that someone in the property has life support equipment.</TextNote> */}
      { pref?.interestedGreenPower === 'Yes' && registrationData?.billType === 'Email' ?
        <div className="w-full lg:w-1/2">
        <ControllerSelectInput
          control={control}
          name={`${prefix}.greenPowerOption`}
          label="How much would you like to take up? There is an additional cost of 4.95 c/kWh (inc GST)"
          textLabel="How much would you like to take up? There is an additional cost of 4.95 c/kWh (inc GST)"
          placeholder="Select..."
          options={GREEN_POWER_OPTIONS}
          required
        />
      </div>
      : null}
      
      <>
        <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.recieveEmailBill`}
        label={'Energy Australia will use your email address to send your bills and any other notices, is that ok?'}
        options={YES_NO_OPTIONS}
        required
        />
        {pref?.recieveEmailBill === 'No' && !registrationData.fullAddress?.includes('NSW') ?
          <TextNote className='text-sm'>A fee of $1.69 Inc. GST may apply per bill</TextNote>
        : null}
      </> 
    </AccordionCard>
  )
}

interface EnergyAUPreferenceProps {
  control: Control
  siteAddress?: string
  prefix: string
  pref?: Record<string, string>
  isElectric?: boolean
}

export default EnergyAUPreference
