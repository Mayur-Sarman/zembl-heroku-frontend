import { Control } from 'react-hook-form'
import DateInput from '../../Inputs/DateInput'
import ZemblPhoneInput from '../../Inputs/PhoneInput'
import { Typography } from '@material-tailwind/react'
import AccordionCard from '../../AccordionCard'
import { TITLE_LIST_OPTIONS, YES_NO_OPTIONS } from '../../../constants'
import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'
import ControllerSelectInput from '../../Inputs/ControllerSelectInput'
import ControllerInput from '../../Inputs/ControllerInput'
import { EMAIL_VALIDATION, REQUIRED_VALIDATION, STANDARD_SF_TEXT_VALIDATION } from '../../../constants/validation'

const SecondaryAccountHolderForm = ({ control, hasSecondaryAccountHolder }: SecondaryAccountHolderFormProps) => {
  return (
    <AccordionCard
      alwaysOpen
      open
      title="Secondary Account Holder"
      bodyClassName="w-full flex flex-col gap-3 text-left"
    >
      <div className="flex flex-col gap-y-3">
        <ControllerRadioGroupInput
          name="hasSecondaryAccountHolder"
          control={control}
          label="Want to add another authorised person?"
          options={YES_NO_OPTIONS}
          required
        />
      </div>

      <div className="bg-zembl-s1 p-4 rounded-md border">
        <Typography className="font-normal">
          The nominated person has been added as an authorised contact person. They will be able to maintain your
          account, including disconnecting the supply. However, they will not be able to accept any product offers,
          connect you at a new property or establish a concession rebate. Please be aware that their name will not be
          displayed on the bill, and they will remain on the account until removed or it is no longer active.
        </Typography>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6 ${hasSecondaryAccountHolder ? '' : 'hidden'}`}>
        <div className="w-full lg:col-span-2 lg:w-1/2">
          <ControllerSelectInput
            name="secondaryHolder.title"
            control={control}
            label="Title"
            textLabel="Title"
            placeholder="Select..."
            options={TITLE_LIST_OPTIONS}
            rules={hasSecondaryAccountHolder ? REQUIRED_VALIDATION : {}}
          />
        </div>
        <ControllerInput
          control={control}
          name="secondaryHolder.firstName"
          label="First Name"
          textLabel="First Name (As per ID)"
          required={hasSecondaryAccountHolder}
          rules={STANDARD_SF_TEXT_VALIDATION}
        />
        <ControllerInput
          control={control}
          name="secondaryHolder.lastName"
          label="Last Name"
          textLabel="Last Name"
          required={hasSecondaryAccountHolder}
          rules={STANDARD_SF_TEXT_VALIDATION}
        />
        <ControllerInput
          control={control}
          name="secondaryHolder.email"
          label="Email"
          textLabel="Email"
          type="email"
          required={hasSecondaryAccountHolder}
          rules={EMAIL_VALIDATION}
        />
        <ZemblPhoneInput
          control={control}
          label="Mobile Number"
          name="secondaryHolder.mobileNumber"
          defaultCountry={'au'}
          dropdownClass="bottom-8 !rounded-lg"
          required={hasSecondaryAccountHolder}
        />
        <DateInput
          label="Date of Birth"
          control={control}
          name="dateOfBirth"
          datepickerClassNames={'top-auto'}
          required
        />
      </div>
    </AccordionCard>
  )
}

interface SecondaryAccountHolderFormProps {
  control: Control
  hasSecondaryAccountHolder: boolean
}

export default SecondaryAccountHolderForm
