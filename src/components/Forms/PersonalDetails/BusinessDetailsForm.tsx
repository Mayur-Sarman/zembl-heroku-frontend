import { Control } from 'react-hook-form'
import AccordionCard from '../../AccordionCard'
import ControllerInput from '../../Inputs/ControllerInput'
import {
  REQUIRED_VALIDATION,
  STANDARD_SF_TEXT_VALIDATION,
  ABN_NMI_MIRN_VALIDATION,
} from '../../../constants/validation'

const BusinessDetailsForm = ({ control, readOnly, compactForm, prefix }: BusinessDetailsFormProps) => {
  const requiredValidation = {
    value: readOnly ? false : true
  }
  return (
    <AccordionCard alwaysOpen open title="Business Details" bodyClassName="w-full flex flex-col gap-3 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
        <ControllerInput
          name={`${prefix ? prefix + '.' : ''}legalName`}
          control={control}
          label="Legal Name"
          textLabel="Legal Name"
          rules={{ ...STANDARD_SF_TEXT_VALIDATION, requiredValidation }}
          readOnly={readOnly}
        />
        <ControllerInput
          name={`${prefix ? prefix + '.' : ''}abn`}
          control={control}
          label="ABN Number"
          textLabel="ABN Number"
          readOnly={readOnly}
          rules={{ ...ABN_NMI_MIRN_VALIDATION, REQUIRED_VALIDATION }}
        />
        {compactForm ? null : (
          <ControllerInput
            name={`${prefix ? prefix + '.' : ''}position`}
            label="Position"
            control={control}
            textLabel="Position"
            rules={{ ...STANDARD_SF_TEXT_VALIDATION, REQUIRED_VALIDATION }}
            readOnly={readOnly}
          />
        )}
      </div>
    </AccordionCard>
  )
}

interface BusinessDetailsFormProps {
  control: Control
  readOnly?: boolean
  compactForm?: boolean
  prefix?: string
}

export default BusinessDetailsForm
