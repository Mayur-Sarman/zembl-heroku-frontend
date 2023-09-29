import { Control } from 'react-hook-form'
import { NSW_VALUE, QLD_VALUE, REGISTRATION_TYPE_BUSINESS, SA_VALUE, VIC_VALUE } from '../../../constants'
import AGLConcession from './ConcessionVariants/AGLConcession'
import AGLSecondaryContactForm from './SecondaryContactVariants/AGLSecondaryContactForm'
import AGLNewConnectionVIC from './NewConnectionVariants/AGL/AGLNewConnectionVIC'
import AGLNewConnectionNSW from './NewConnectionVariants/AGL/AGLNewConnectionNSW'
import AGLNewConnectionSA from './NewConnectionVariants/AGL/AGLNewConnectionSA'
import AGLNewConnectionQLD from './NewConnectionVariants/AGL/AGLNewConnectionQLD'

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

  const secondaryContactDisplay = !isBusiness && (
    <AGLSecondaryContactForm
      control={control}
      hasSecondaryContact={hasSecondaryContact}
      contactName={secondaryContactName}
    />
  )

  let newConnectionDisplay = null
  if (isNewConnection && electric) {
    switch (state) {
      case VIC_VALUE.shortName:
        newConnectionDisplay = (
          <AGLNewConnectionVIC
            control={control}
            connectionPrice={connectionPrice}
            hasAnyWorkCompleted={hasWorkCompleted}
            hasPower={hasPower}
          />
        )
        break
      case NSW_VALUE.shortName:
        newConnectionDisplay = (
          <AGLNewConnectionNSW control={control} connectionPrice={connectionPrice} hasPower={hasPower} />
        )
        break
      case SA_VALUE.shortName:
        newConnectionDisplay = (
          <AGLNewConnectionSA control={control} connectionPrice={connectionPrice} hasPower={hasPower} />
        )
        break
      case QLD_VALUE.shortName:
        newConnectionDisplay = (
          <AGLNewConnectionQLD control={control} connectionPrice={connectionPrice} hasPower={hasPower} />
        )
        break
    }
  }

  return (
    <div>
      {concessionDisplay}
      {secondaryContactDisplay}
      {newConnectionDisplay}
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
  connectionPrice: number
}

export default AGLPersonalDetailsForm
