import { Control } from 'react-hook-form'
import { NO_VALUE, YES_NO_OPTIONS, YES_VALUE } from '../../../../constants'
import AccordionCard from '../../../AccordionCard'
import ControllerRadioGroupInput from '../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../TextNote'
import { Typography } from '@material-tailwind/react'

const MomentumConcession = ({ control, applyConcession, concessionConsent }: MomentumConcessionProps) => {
  return (
    <AccordionCard alwaysOpen open title="Concession" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        name="applyConcession"
        label="Are you applying for a concession or rebate?"
        control={control}
        options={YES_NO_OPTIONS}
      />

      {applyConcession === YES_VALUE ? (
        <ControllerRadioGroupInput
          label={
            <div className="flex flex-col gap-6">
              <TextNote>
                Momentum will use Services Australia to check if you qualify for a concession, rebate or service. In
                doing so, Momentum may share your information and access information about you held by Centrelink or the
                Department of Veteran Affairs. This includes personal information like your name, address, payment and
                concession details. Once given, your consent is only valid while you’re with Momentum, and can be
                withdrawn by contacting them or Services Australia (although this may make you ineligible for the
                concession or rebate).
              </TextNote>
              <Typography variant='small'>
                Do you understand and consent to this and by doing so, authorise Services Australia to use your
                information and share it with Momentum?
              </Typography>
            </div>
          }
          name="concessionConsent"
          control={control}
          options={YES_NO_OPTIONS}
        />
      ) : null}

      {concessionConsent === NO_VALUE ? (
        <TextNote className='text-blue-700'>
          You must consent to Momentum Energy accessing your information held by the Services Australia to have your
          concession applied. Update your preference or please call Zembl on 1300 957 721 for assistance.
        </TextNote>
      ) : null}
    </AccordionCard>
  )
}

export default MomentumConcession

interface MomentumConcessionProps {
  control: Control
  energyType?: string | null
  newConnection?: boolean
  applyConcession?: string
  concessionConsent?: string
}
