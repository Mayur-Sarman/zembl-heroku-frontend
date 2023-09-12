import AccordionCard from '../../AccordionCard'
import { Control, Controller } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../../constants'
import RadioGroupInput from '../../Inputs/RadioGroupInput'
import ReZemblNote from '../../Notes/ReZemblNote'

const ReZemblForm = ({ control }: ReZemblFormProps) => {
  return (
    <AccordionCard title="Re-Zembl" alwaysOpen open bodyClassName={`w-full flex flex-col gap-3 text-left`}>
      <ReZemblNote />
      {/* <RichText htmlString={termAndConditions} /> */}

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
    </AccordionCard>
  )
}

interface ReZemblFormProps {
  control: Control
}

export default ReZemblForm
