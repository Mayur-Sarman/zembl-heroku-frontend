import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import { Typography } from '@material-tailwind/react'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'

const BlueNRGPreference = ({ control, prefix }: BlueNRGPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Blue NRG Preferences" bodyClassName="flex-col text-left gap-y-6">
      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.consentMonthlyBilling`}
        required
        label={'Do you consent to receive your èlectricity bills from Blue NRG on a monthly basis?'}
        options={YES_NO_OPTIONS}
      />

      <TextNote>
        This plan is not available to customers who do not consent to monthly billing. Update your preference or please
        call Zembl on 1300 957 721 for assistance.
      </TextNote>
      <Typography>
        Blue NRG may collect, use, and disclose to its related bodies, credit reporting agencies and third parties -
        your personal, business, credit related and confidential information (including metering data) where it is
        permitted under government legislation and in accordance with our Privacy Policy. In doing so, we may assess
        your credit worthiness prior to switching to Blue NRG. You will receive a copy of these terms and conditions via
        your preferred communication method.
      </Typography>

      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.doYouUnderstandAndAcceptTheTerms`}
        required
        label={'Do you understand and accept these terms?”'}
        options={YES_NO_OPTIONS}
      />

      <TextNote>
        This plan is not available to where the electricity at the site is not used predominately for business purposes.
        Update your preference or please call Zembl on 1300 957 721 for assistance.
      </TextNote>

      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.smallBusinessCustomerConsent`}
        required
        label={
          'The electricity at the supply address must be used predominantly for business purposes and must be a business premises. Blue NRG does not provide electricity for residential purposes. Do you agree that you are a small business customer for the purposes of this agreement?” '
        }
        options={YES_NO_OPTIONS}
      />

      <TextNote>
        This plan is not available to where the electricity at the site is not used predominately for business purposes.
        Update your preference or please call Zembl on 1300 957 721 for assistance.
      </TextNote>
    </AccordionCard>
  )
}

interface BlueNRGPreferenceProps {
  control: Control
  prefix: string
}

export default BlueNRGPreference
