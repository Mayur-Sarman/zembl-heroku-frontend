import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { LIFE_SUPPORT_EQUIPMENT_OPTIONS, YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import { Typography } from '@material-tailwind/react'
import ControllerSelectInput from '../Inputs/ControllerSelectInput'
import { REQUIRED_VALIDATION } from '../../constants/validation'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'
import { useRegistration } from '../../hooks/useRegistration'

const AGLPreference = ({ control, prefix}: AGLPreferenceProps) => {
  const { registrationData } = useRegistration()

  return (
    <AccordionCard alwaysOpen open title="AGL Preferences" bodyClassName="flex-col text-left gap-y-6">
      <TextNote>You have indicated that someone in the property has life support equipment.</TextNote>
      <div className="w-full">
        { registrationData.lifeSupport === 'Yes' ?
          <div className="w-full lg:w-1/2">
          <ControllerSelectInput
            control={control}
            label="What type of life support equipment?"
            textLabel="What type of life support equipment?"
            placeholder="Select..."
            options={LIFE_SUPPORT_EQUIPMENT_OPTIONS}
            name={`${prefix}.lifeSupportEquipment`}
            rules={REQUIRED_VALIDATION}
          />
        </div>
        : null}
        
        {(!!(registrationData?.electricityQuote?.quoteId && !registrationData?.gasQuote?.quoteId) || !!(!registrationData?.electricityQuote?.quoteId && registrationData?.gasQuote?.quoteId)) ?
        <Typography variant="small" className="mt-3">
        If your life support equipment requires both gas and electricity to operate, please inform your {!registrationData?.gasQuote?.quoteId ? 'Electricity' : 'Gas'} retailer that you or someone at your property relies on life support equipment.
      </Typography>
        : null}
        

      </div>
      <Typography>
        AGL will conduct a credit check and consider your history with them. AGL will use your details safely in
        accordance with their privacy and credit reporting policy which is available at{' '}
        <a href="https://www.agl.com.au/privacy-policy">https://www.agl.com.au/privacy-policy</a>.
      </Typography>
      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.creditCheckConsent`}
        required
        label={'Do you consent to a credit check?'}
        options={YES_NO_OPTIONS}
      />

      { (registrationData?.electricityQuote?.quoteId && !registrationData?.gasQuote?.quoteId) && registrationData.accountType !== 'Residential' ?
        <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.carbonNeutral`}
        required
        label={
          "You now have the option to choose to go Carbon Neutral on AGL's Small Business electricity plans for $4 per week. Would you like to opt into that now?"
        }
        options={YES_NO_OPTIONS}
      />
      : null}

      { (!registrationData?.electricityQuote?.quoteId && registrationData?.gasQuote?.quoteId) && registrationData.accountType !== 'Residential' ?
        <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.carbonNeutral`}
        required
        label={
          "You now have the option to choose to go Carbon Neutral on AGL's Small Business electricity plans for $4 per week. Would you like to opt into that now?"
        }
        options={YES_NO_OPTIONS}
      />
      : null}

      { (registrationData?.electricityQuote?.quoteId && registrationData?.gasQuote?.quoteId) && registrationData.accountType !== 'Residential' ?
        <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.carbonNeutral`}
        required
        label={
          "You now have the option to choose to go Carbon Neutral on AGL's Small Business electricity plans for $4 per week and AGL's Small Business Gas plans for $7 per week. Would you like to opt into that now?"
        }
        options={YES_NO_OPTIONS}
      />
      : null}

      { (registrationData?.electricityQuote?.quoteId && registrationData?.gasQuote?.quoteId) && registrationData.accountType === 'Residential' ?
        <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.carbonNeutral`}
        required
        label={
          "You now have the option to choose to go Carbon Neutral on AGL's Residential electricity plans for $1 per week and AGL's Residential Gas plans for 50 cents per week. Would you like to opt into that now?"
        }
        options={YES_NO_OPTIONS}
      />
      : null}

      { (registrationData?.electricityQuote?.quoteId && !registrationData?.gasQuote?.quoteId) && registrationData.accountType === 'Residential' ?
        <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.carbonNeutral`}
        required
        label={
          "You now have the option to choose to go Carbon Neutral on AGL's Residential electricity plans for $1 per week. Would you like to opt into that now?"
        }
        options={YES_NO_OPTIONS}
      />
      : null}

      { (registrationData?.electricityQuote?.quoteId && !registrationData?.gasQuote?.quoteId) && registrationData.accountType === 'Residential' ?
        <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.carbonNeutral`}
        required
        label={
          "You now have the option to choose to go Carbon Neutral on AGL's Residential Gas plans for 50 cents per week. Would you like to opt into that now?"
        }
        options={YES_NO_OPTIONS}
      />
      : null}
      
    </AccordionCard>
  )
}

interface AGLPreferenceProps {
  control: Control
  prefix: string
}

export default AGLPreference
