import { Control } from 'react-hook-form'
import DateInput from '../../Inputs/DateInput'
import ZemblPhoneInput from '../../Inputs/PhoneInput'
import { Typography } from '@material-tailwind/react'
import AccordionCard from '../../AccordionCard'
import { TITLE_LIST_OPTIONS, YES_NO_OPTIONS, YES_VALUE } from '../../../constants'
import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'
import ControllerSelectInput from '../../Inputs/ControllerSelectInput'
import ControllerInput from '../../Inputs/ControllerInput'
import {
  DATE_MUST_PAST,
  EMAIL_VALIDATION,
  REQUIRED_VALIDATION,
  STANDARD_SF_TEXT_VALIDATION,
} from '../../../constants/validation'

const SecondaryAccountHolderForm = ({ control, hasSecondaryContact }: SecondaryAccountHolderFormProps) => {
  const isSecondaryContact = hasSecondaryContact === YES_VALUE
  return (
    <AccordionCard
      alwaysOpen
      open
      title="Secondary Account Holder"
      bodyClassName="w-full flex flex-col gap-3 text-left"
    >
      <div className="flex flex-col gap-y-3">
        <ControllerRadioGroupInput
          name="secondaryContact.hasSecondaryContact"
          control={control}
          label="Want to add another authorised person?"
          options={YES_NO_OPTIONS}
          required
        />
      </div>

      {hasSecondaryContact === YES_VALUE ? (
        <>
          <div className="bg-zembl-s1 p-4 rounded-md border">
            <Typography className="font-normal">
              The nominated person has been added as an authorised contact person. They will be able to maintain your
              account, including disconnecting the supply. However, they will not be able to accept any product offers,
              connect you at a new property or establish a concession rebate. Please be aware that their name will not
              be displayed on the bill, and they will remain on the account until removed or it is no longer active.
            </Typography>
          </div>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6`}>
            <div className="w-full lg:col-span-2 lg:w-1/2">
              <ControllerSelectInput
                name="secondaryContact.title"
                control={control}
                label="Title"
                textLabel="Title"
                placeholder="Select..."
                options={TITLE_LIST_OPTIONS}
                rules={isSecondaryContact ? REQUIRED_VALIDATION : {}}
              />
            </div>
            <ControllerInput
              control={control}
              name="secondaryContact.firstName"
              label="First Name"
              textLabel="First Name (As per ID)"
              required={isSecondaryContact}
              rules={STANDARD_SF_TEXT_VALIDATION}
            />
            <ControllerInput
              control={control}
              name="secondaryContact.lastName"
              label="Last Name"
              textLabel="Last Name"
              required={isSecondaryContact}
              rules={STANDARD_SF_TEXT_VALIDATION}
            />
            <ControllerInput
              control={control}
              name="secondaryContact.email"
              label="Email"
              textLabel="Email"
              type="email"
              required={isSecondaryContact}
              rules={EMAIL_VALIDATION}
            />
            <ZemblPhoneInput
              control={control}
              label="Mobile Number"
              name="secondaryContact.mobile"
              defaultCountry={'au'}
              dropdownClass="bottom-8 !rounded-lg"
              required={isSecondaryContact}
            />
            <DateInput
              label="Date of Birth"
              control={control}
              name="secondaryContact.dateOfBirth"
              datepickerClassNames={'top-auto'}
              required={isSecondaryContact}
              rules={DATE_MUST_PAST}
              maxDate={new Date()}
            />
          </div>
        </>
      ) : null}
    </AccordionCard>
  )
}

interface SecondaryAccountHolderFormProps {
  control: Control
  hasSecondaryContact: string
}

export default SecondaryAccountHolderForm
