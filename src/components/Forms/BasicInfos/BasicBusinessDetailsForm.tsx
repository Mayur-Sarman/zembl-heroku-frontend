import { Control } from 'react-hook-form'
import AccordionCard from '../../AccordionCard'
import GoogleAddressInput from '../../Inputs/GoogleAddressInput'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { GoogleMapExtractedComponents } from '../../../helpers/googleMap'
import { REQUIRED_VALIDATION, ABN_NMI_MIRN_VALIDATION } from '../../../constants/validation'
import ControllerInput from '../../Inputs/ControllerInput'

const BasicBusinessDetailsForm = ({ control }: BasicBusinessDetailsFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Business Details">
      <div className="w-full lg:w-1/2 flex flex-col gap-3">
        <GoogleAddressInput
          required
          textLabel="Enter your Postcode"
          name="postcode"
          displayAs={(components: GoogleMapExtractedComponents | null) => components?.postalCode ?? ''}
          control={control}
          rules={{ ...REQUIRED_VALIDATION }}
        />
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
      </div>
    </AccordionCard>
  )
}

interface BasicBusinessDetailsFormProps {
  control: Control
}

export default BasicBusinessDetailsForm
