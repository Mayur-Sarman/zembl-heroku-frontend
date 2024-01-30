import { Control } from 'react-hook-form'
import SESecondaryContactForm from './SecondaryContactVariants/SESecondaryContactForm'
import SEConcessionSA from './ConcessionVariants/SEConcessionSA'
import { NSW_VALUE, RESIDENTIAL_VALUE, SA_VALUE, VIC_VALUE } from '../../../constants'
import SEConcessionNotSA from './ConcessionVariants/SEConcessionNotSA'
import SENewConnection from './NewConnectionVariants/SE/SENewConnection'

const SEPersonalDetailsForm = ({
  control,
  isNewConnection,
  state,
  hasSecondaryContact,
  powerAware,
  electricityConnectionPrice,
  gasConnectionPrice,
  secondaryContactName,
  electric,
  concessionCardHolder,
  concessionConsent,
  registrationType,
  siteAddress,
  onlyResidence,
}: SEPersonalDetailsFormProps) => {
  const showConcessionForm =
    registrationType === RESIDENTIAL_VALUE &&
    electric &&
    [NSW_VALUE.shortName, VIC_VALUE.shortName, SA_VALUE.shortName].includes(state)

  let concessionForm = null
  if (showConcessionForm && [NSW_VALUE.shortName, VIC_VALUE.shortName].includes(state)) {
    concessionForm = (
      <SEConcessionNotSA
        control={control}
        concessionCardHolder={concessionCardHolder}
        concessionConsent={concessionConsent}
        state={state}
        onlyResidence={onlyResidence}
        siteAddress={siteAddress}
      />
    )
  } else if (showConcessionForm && [SA_VALUE.shortName].includes(state)) {
    concessionForm = <SEConcessionSA control={control} concessionCardHolder={concessionCardHolder} />
  }

  return (
    <div className="flex flex-col gap-6">
      <SESecondaryContactForm
        control={control}
        hasSecondaryContact={hasSecondaryContact}
        contactName={secondaryContactName}
      />

      {concessionForm}
      {isNewConnection ? (
        <SENewConnection
          control={control}
          electricPrice={electricityConnectionPrice}
          gasPrice={gasConnectionPrice}
          powerAware={powerAware}
          state={state}
        />
      ) : null}
    </div>
  )
}

interface SEPersonalDetailsFormProps {
  control: Control
  isNewConnection: boolean
  state: string
  electric: boolean
  hasSecondaryContact: string
  secondaryContactName: string
  powerAware: string
  electricityConnectionPrice?: string | null
  gasConnectionPrice?: string | null
  concessionCardHolder: string
  concessionConsent: string
  registrationType: string
  onlyResidence: string
  siteAddress: string
}

export default SEPersonalDetailsForm
