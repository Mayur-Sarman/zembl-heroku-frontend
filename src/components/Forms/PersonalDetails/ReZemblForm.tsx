import AccordionCard from '../../AccordionCard'
import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../../constants'
import ReZemblNote from '../../Notes/ReZemblNote'
import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'

const ReZemblForm = ({ control }: ReZemblFormProps) => {
  return (
    <AccordionCard title="Re-Zembl" alwaysOpen open bodyClassName={`w-full flex flex-col gap-3 text-left`}>
      <ReZemblNote />
      {/* <RichText htmlString={termAndConditions} /> */}

      <div className="w-full flex flex-col gap-3 text-left">
        <ControllerRadioGroupInput
          control={control}
          name="reZembl"
          label="Register for Re-Zembl?"
          options={YES_NO_OPTIONS}
          required
        />
      </div>
    </AccordionCard>
  )
}

interface ReZemblFormProps {
  control: Control
}

export default ReZemblForm
