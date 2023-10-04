import { Control } from 'react-hook-form'
import AccordionCard from '../../../AccordionCard'
import ControllerRadioGroupInput from '../../../Inputs/ControllerRadioGroupInput'
import { YES_NO_OPTIONS, YES_VALUE } from '../../../../constants'
import TextNote from '../../../TextNote'

const SEConcessionSA = ({ control, concessionCardHolder }: SEConcessionSAProps) => {
  return (
    <AccordionCard alwaysOpen open title="Concession" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        name="concession.concessionCardHolder"
        label="Do you currently receive a government concession or rebate that can be added to your account?"
        control={control}
        options={YES_NO_OPTIONS}
      />
      {concessionCardHolder === YES_VALUE ? (
        <TextNote>
          You will need to update your details with the South Australian Department of Human Services. You can either
          download the form from the DHS website, complete the concession form in the welcome pack or call the DHS on
          1800 307 758.
        </TextNote>
      ) : null}
    </AccordionCard>
  )
}

interface SEConcessionSAProps {
  control: Control
  concessionCardHolder: string
}

export default SEConcessionSA
