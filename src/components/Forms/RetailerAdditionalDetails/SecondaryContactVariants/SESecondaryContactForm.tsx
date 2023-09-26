import AccordionCard from '../../../AccordionCard'
import ControllerRadioGroupInput from '../../../Inputs/ControllerRadioGroupInput'
import { NO_RENEW, NO_TRANSFER_NEW, YES_VALUE } from '../../../../constants'
import { Control } from 'react-hook-form'
import TextNote from '../../../TextNote'
import SecondaryContactForm from '../../SecondaryContactForm'

const ADD_SECONDARY_OPTIONS = [
  { label: YES_VALUE, value: YES_VALUE },
  { label: NO_TRANSFER_NEW, value: NO_TRANSFER_NEW },
  { label: NO_RENEW, value: NO_RENEW },
]

const SESecondaryContactForm = ({
  control,
  contactName,
  hasSecondaryContact,
  isAuthorize,
}: SESecondaryContactFormProps) => {
  const isSecondary = hasSecondaryContact === YES_VALUE
  return (
    <AccordionCard
      alwaysOpen
      open
      title="Secondary Account Holder"
      bodyClassName="w-full flex flex-col gap-3 text-left"
    >
      <div className="flex flex-col gap-y-3">
        <ControllerRadioGroupInput
          name="hasSecondaryContact"
          control={control}
          label="Would you like to add anyone else to the account?"
          options={ADD_SECONDARY_OPTIONS}
          required
        />
      </div>

      {isSecondary ? <SecondaryContactForm control={control} /> : null}
      {isSecondary ? (
        <TextNote>
          Please let {contactName} know about Simply Energy’s Privacy Policy, which sets out how we collect and use
          personal information. This can be found on Simply Energy’s website. By adding {contactName} as a contact on
          your account, you consent to us providing them with any of your account details. That person will not have the
          right to terminate or agree to any changes to the contract or to move premises on your behalf.
        </TextNote>
      ) : null}

      {isSecondary ? (
        <ControllerRadioGroupInput
          name="isAuthorize"
          control={control}
          label={`Do you authorise to add ${contactName} to this account?`}
          options={ADD_SECONDARY_OPTIONS}
          required
        />
      ) : null}

      <TextNote className={`${isAuthorize ? '' : 'hidden'}`}>
        Simply Energy can add a signatory to your account, which means they will be able to make changes. You can do
        this by contacting Simply Energy directly once your service(s) are connected.
      </TextNote>
    </AccordionCard>
  )
}

interface SESecondaryContactFormProps {
  control: Control
  contactName?: string
  hasSecondaryContact: string
  isAuthorize?: boolean
}

export default SESecondaryContactForm
