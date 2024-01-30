import AccordionCard from '../../../AccordionCard'
import ControllerRadioGroupInput from '../../../Inputs/ControllerRadioGroupInput'
import { NO_VALUE, YES_VALUE } from '../../../../constants'
import { Control } from 'react-hook-form'
import TextNote from '../../../TextNote'
import SecondaryContactForm from '../../SecondaryContactForm'

const ADD_SECONDARY_OPTIONS = [
  { label: YES_VALUE, value: YES_VALUE },
  { label: NO_VALUE, value: NO_VALUE },
]

const AGLSecondaryContactForm = ({
  control,
  contactName,
  hasSecondaryContact,
  isTransfer,
}: AGLSecondaryContactFormProps) => {
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
          name="secondaryContact.hasSecondaryContact"
          control={control}
          label="Would you like to add any authorised contacts to the account? "
          options={ADD_SECONDARY_OPTIONS}
          required
        />
      </div>

      {isSecondary ? <SecondaryContactForm control={control} /> : null}

      {isSecondary ? (
        <>
          <TextNote>
          ${contactName} has been added as an authorised contact person. They will be able to maintain your account, including disconnecting the supply. However, they will not be able to accept any product offers, connect you at a new property or establish a concession rebate. Please be aware that their name will not be displayed on the bill, and they will remain on the account until removed or it is no longer active.
          </TextNote>
        </>
      ) : null}

      {!isSecondary ? (
        isTransfer ? (
          <TextNote>
            If you have held an account with AGL, we will delete any unauthorised contacts if it’s not in use.
          </TextNote>
        ) : (
          <TextNote>Please note that any existing authorised contacts will remain on your account.</TextNote>
        )
      ) : null}
    </AccordionCard>
  )
}

interface AGLSecondaryContactFormProps {
  control: Control
  contactName?: string
  hasSecondaryContact: string
  isTransfer?: boolean
}

export default AGLSecondaryContactForm
