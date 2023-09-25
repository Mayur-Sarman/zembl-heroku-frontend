import { Control } from 'react-hook-form'
import AccordionCard from '../../AccordionCard'
import GoogleAddressInput from '../../Inputs/GoogleAddressInput'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { REQUIRED_VALIDATION, ABN_NMI_MIRN_VALIDATION } from '../../../constants/validation'
import ControllerInput from '../../Inputs/ControllerInput'

const BasicBusinessDetailsForm = ({ control, hideNonBusiness }: BasicBusinessDetailsFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Business Details">
      <div className="w-full lg:w-1/2 flex flex-col gap-3">
        <GoogleAddressInput
          required
          textLabel="Enter your address"
          name="address"
          control={control}
          rules={REQUIRED_VALIDATION}
        />
        {!hideNonBusiness ? (
          <ControllerInput
            name="abn"
            control={control}
            rules={{
              ...REQUIRED_VALIDATION,
              ...ABN_NMI_MIRN_VALIDATION,
            }}
            required
            inputLabel="ABN"
            textLabel="Enter your ABN"
            icon={<MagnifyingGlassIcon fontSize={24} />}
          />
        ) : null}
      </div>
    </AccordionCard>
  )
}

interface BasicBusinessDetailsFormProps {
  control: Control
  hideNonBusiness: boolean
}

export default BasicBusinessDetailsForm
