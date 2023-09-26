import { Control } from 'react-hook-form'
import ControllerInput from '../Inputs/ControllerInput'
import ZemblPhoneInput from '../Inputs/PhoneInput'
import DateInput from '../Inputs/DateInput'
import { EMAIL_VALIDATION, REQUIRED_VALIDATION, STANDARD_SF_TEXT_VALIDATION } from '../../constants/validation'
import { TITLE_LIST_OPTIONS } from '../../constants'
import ControllerSelectInput from '../Inputs/ControllerSelectInput'

interface SecondaryContactFormProps {
  control: Control
}

const SecondaryContactForm = ({ control }: SecondaryContactFormProps) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6`}>
      <div className="w-full lg:col-span-2 lg:w-1/2">
        <ControllerSelectInput
          name="secondaryHolder.title"
          control={control}
          label="Title"
          textLabel="Title"
          placeholder="Select..."
          options={TITLE_LIST_OPTIONS}
          rules={REQUIRED_VALIDATION}
        />
      </div>
      <ControllerInput
        control={control}
        name="secondaryHolder.firstName"
        label="First Name"
        textLabel="First Name (As per ID)"
        required
        rules={STANDARD_SF_TEXT_VALIDATION}
      />
      <ControllerInput
        control={control}
        name="secondaryHolder.lastName"
        label="Last Name"
        textLabel="Last Name"
        required
        rules={STANDARD_SF_TEXT_VALIDATION}
      />
      <ControllerInput
        control={control}
        name="secondaryHolder.email"
        label="Email"
        textLabel="Email"
        type="email"
        required
        rules={EMAIL_VALIDATION}
      />
      <ZemblPhoneInput
        control={control}
        label="Mobile Number"
        name="secondaryHolder.mobileNumber"
        defaultCountry={'au'}
        dropdownClass="bottom-8 !rounded-lg"
        required
      />
      <DateInput
        label="Date of Birth"
        control={control}
        name="secondaryHolder.dateOfBirth"
        datepickerClassNames={'top-auto'}
        required
      />
    </div>
  )
}

export default SecondaryContactForm
