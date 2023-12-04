import { Control } from 'react-hook-form'
import { Typography } from '@material-tailwind/react'
import AccordionCard from '../../AccordionCard'
import { YES_NO_OPTIONS, YES_VALUE } from '../../../constants'
import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'
import SecondaryContactForm from '../SecondaryContactForm'


const SecondaryAccountHolderForm = ({ control, hasSecondaryContact }: SecondaryAccountHolderFormProps) => {
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

          <SecondaryContactForm
            control={control}
          />
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
