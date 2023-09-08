import { Checkbox } from '@material-tailwind/react'
import AccordionCard from '../../AccordionCard'
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../../constants'
import RadioGroupInput from '../../Inputs/RadioGroupInput'
import ReZemblNote from '../../Notes/ReZemblNote'
import MiniPlanCard from '../../MiniPlanCard'

import zemblIcon from '../../../assets/zembl-icon.svg'

const ReZemblForm = ({ control, register, hideIcon }: ReZemblFormProps) => {
  return (
    <AccordionCard
      title="Re-Zembl"
      alwaysOpen
      open
      bodyClassName={`w-full flex flex-col gap-3 text-left ${!hideIcon ? 'p-0' : ''}`}
      containerClassName={`${!hideIcon ? 'contents' : ''}`}
      headerClassName={!hideIcon ? `hidden` : ''}
    >
      <div className="hidden">
        <ReZemblNote />

        <div className="w-full flex flex-col gap-3 text-left">
          <Controller
            control={control}
            name="reZembl"
            render={({ field }) => (
              <RadioGroupInput
                {...field}
                label="Register for Re-Zembl?"
                values={[field.value]}
                options={YES_NO_OPTIONS}
              />
            )}
          />
        </div>
      </div>
      <div className={`p-6 ${hideIcon ? 'hidden' : ''}`}>
        <MiniPlanCard brandIcon={zemblIcon} planName="Re-Zembl" energyType="" />
      </div>
      <ReZemblNote />
      {!hideIcon ? (
        <Checkbox
          type="checkbox"
          label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
          {...register(`acceptReZemblTC`)}
          crossOrigin=""
        />
      ) : null}
      {hideIcon ? (
        <div className="w-full flex flex-col gap-3 text-left">
          <Controller
            control={control}
            name="reZembl"
            render={({ field }) => (
              <RadioGroupInput
                {...field}
                label="Register for Re-Zembl?"
                values={[field.value]}
                options={YES_NO_OPTIONS}
              />
            )}
          />
        </div>
      ) : null}
    </AccordionCard>
  )
}

interface ReZemblFormProps {
  control: Control
  register: UseFormRegister<FieldValues>
  hideIcon?: boolean
}

export default ReZemblForm
