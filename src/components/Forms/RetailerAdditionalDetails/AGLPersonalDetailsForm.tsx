import { Control } from 'react-hook-form'
import { REGISTRATION_TYPE_BUSINESS } from '../../../constants'
import AGLConcession from './ConcessionVariants/AGLConcession'
import AGLSecondaryContactForm from './SecondaryContactVariants/AGLSecondaryContactForm'
import AGLNewConnection from './NewConnectionVariants/AGL/AGLNewConnection'
import SecondaryAccountHolderForm from '../PersonalDetails/SecondaryAccountHolderForm'

const AGLPersonalDetailsForm = ({
  control,
  registrationType,
  isNewConnection,
  state,
  electric,
  concessionHolder,
  concessionConsent,
  hasSecondaryContact,
  secondaryContactName,
  hasPower,
  hasWorkCompleted,
  connectionPrice,
  isTransfer,
}: AGLPersonalDetailsFormProps) => {
  const isBusiness = registrationType === REGISTRATION_TYPE_BUSINESS
  const concessionDisplay = !isBusiness && (
    <AGLConcession
      control={control}
      cardHolder={concessionHolder}
      concessionConsent={concessionConsent}
      state={state}
      newConnection={isNewConnection}
    />
  )

  const secondaryContactDisplay = !isBusiness ? (
    <AGLSecondaryContactForm
      control={control}
      hasSecondaryContact={hasSecondaryContact}
      contactName={secondaryContactName}
      isTransfer={isTransfer}
    />
  ) : (
    <SecondaryAccountHolderForm control={control} hasSecondaryContact={hasSecondaryContact} />
  )

  return (
    <div className="flex flex-col gap-6">
      {concessionDisplay}
      {secondaryContactDisplay}
      {isNewConnection && electric ? (
        <AGLNewConnection
          control={control}
          connectionPrice={connectionPrice}
          hasAnyWorkCompleted={hasWorkCompleted}
          hasPower={hasPower}
          state={state}
        />
      ) : null}
    </div>
  )
}

interface AGLPersonalDetailsFormProps {
  control: Control
  registrationType: string
  isNewConnection: boolean
  state: string
  gas: boolean
  electric: boolean
  concessionHolder: string
  concessionConsent: string
  hasSecondaryContact: string
  secondaryContactName: string
  hasPower: string
  hasWorkCompleted: string
  connectionPrice?: number | null
  isTransfer?: boolean
}

export default AGLPersonalDetailsForm
