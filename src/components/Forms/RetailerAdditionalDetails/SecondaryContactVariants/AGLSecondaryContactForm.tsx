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

const AGLSecondaryContactForm = ({ control, contactName, hasSecondaryContact }: AGLSecondaryContactFormProps) => {
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
          label="Would you like to add any authorised contacts to the account? "
          options={ADD_SECONDARY_OPTIONS}
          required
        />
      </div>

      {isSecondary ? (
        <TextNote>
          A {contactName} has been added as an authorised contact person. They will be able to maintain your account,
          including disconnecting the supply. However, they will not be able to accept any product offers, connect you
          at a new property or establish a concession rebate. Please be aware that their name will not be displayed on
          the bill, and they will remain on the account until removed or it is no longer active.
        </TextNote>
      ) : null}

      {isSecondary ? <SecondaryContactForm control={control} /> : null}

      {hasSecondaryContact === NO_TRANSFER_NEW && (
        <TextNote>
          If you have held an account with AGL, we will delete any unauthorised contacts if it’s not in use.
        </TextNote>
      )}

      {hasSecondaryContact === NO_RENEW && (
        <TextNote>Please note that any existing authorised contacts will remain on your account.</TextNote>
      )}
    </AccordionCard>
  )
}

interface AGLSecondaryContactFormProps {
  control: Control
  contactName?: string
  hasSecondaryContact: string
}

export default AGLSecondaryContactForm
