import AccordionCard from '../AccordionCard'
import { Control, Controller } from 'react-hook-form'
import RadioGroupInput from '../Inputs/RadioGroupInput'
import { YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import { Typography } from '@material-tailwind/react'

const BlueNRGPreference = ({ control }: BlueNRGPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Blue NRG Preferences" bodyClassName="flex-col text-left gap-y-6">
      <Controller
        control={control}
        name="isConsentMonthlyNGLBills"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={'Do you consent to receive your energy bills from Blue NRG on a monthly basis?'}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
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
      <Controller
        control={control}
        name="isAcceptBlueNGLTerms"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={'Do you understand and accept these terms?”'}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />
      <TextNote>
        This plan is not available to where the electricity at the site is not used predominately for business purposes.
        Update your preference or please call Zembl on 1300 957 721 for assistance.
      </TextNote>

      <Controller
        control={control}
        name="isSmallBuinessAgreed"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={
              'The electricity at the supply address must be used predominantly for business purposes and must be a business premises. Blue NRG does not provide electricity for residential purposes. Do you agree that you are a small business customer for the purposes of this agreement?” '
            }
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
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
}

export default BlueNRGPreference
