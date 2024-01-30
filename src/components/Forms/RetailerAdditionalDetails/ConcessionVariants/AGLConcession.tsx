import { Control } from 'react-hook-form'
import { NO_VALUE, YES_NO_OPTIONS, YES_VALUE } from '../../../../constants'
import AccordionCard from '../../../AccordionCard'
import ControllerRadioGroupInput from '../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../TextNote'
import ConcessionForm from '../../ConcessionForm'
import { ReactNode } from 'react'

const AGLConcession = ({ control, state, cardHolder, concessionConsent }: AGLConcessionProps) => {
  const concessionNote = getConcessionNote(`${state}`)
  return (
    <AccordionCard alwaysOpen open title="Concession" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        name="concession.concessionCardHolder"
        label="Are you a concession card holder?"
        control={control}
        options={YES_NO_OPTIONS}
        required
      />
      {cardHolder === YES_VALUE ? (
        <>
          {state !== 'SA' ? <ConcessionForm control={control} /> : null}
          {concessionNote ? <TextNote>{concessionNote}</TextNote> : null}

          <ControllerRadioGroupInput
            label="You understand and consent to your Energy Retailer accessing your information held by Services Australia / Department of Veteran Affairs?"
            name="concession.concessionConsent"
            control={control}
            options={YES_NO_OPTIONS}
            required
          />
          {['NSW', 'VIC', 'QLD'].includes(state ?? '') && concessionConsent === NO_VALUE ? (
            <TextNote className="text-black-700">
              Without this consent we can not validate your concession eligiblity. Update your preference or please call
              Zembl on 1300 957 721 for assistance.
            </TextNote>
          ) : null}
        </>
      ) : null}
    </AccordionCard>
  )
}

export default AGLConcession

interface AGLConcessionProps {
  control: Control
  state?: string | null
  newConnection?: boolean
  cardHolder?: string
  concessionConsent?: string
}

const getConcessionNote = (state = ''): ReactNode | null => {
  let concessionNote = null

  if (['NSW', 'VIC'].includes(state)) {
    concessionNote = `Your Energy Retailer will collect and use your name, postcode and concession card information from Services Australia/Department of Veteran Affairs to validate your concession eligibility. This authority is only effective for the period that you are a customer of your energy retailer, and you can revoke your consent at any time by contacting them. If you do not provide your consent, you may not be eligible for the concession. You are required to notify them and your card issuer of any changes in your circumstances which may affect your eligibility for a concession.`
  } else if (['QLD'].includes(state)) {
    concessionNote = (
      <div className="flex flex-col text-sm gap-3">
        <p>
          Your Energy Retailer will collect and use your name, postcode and concession card information from Services
          Australia /Department of Veteran Affairs/Department of Communities to validate your concession eligibility.
          This authority is only effective for the period that you are a customer of your energy retailer and you can
          revoke your consent at any time by contacting them. If you do not provide your consent you may not be eligible
          for the concession. You are required to notify them and your card issuer of any changes in your circumstances
          which may affect your eligibility for a concession. In order to verify your concession, you also agree to the
          following
        </p>
        <p>
          You confirm that the connection address is your principle place of residence and the only residence in QLD for
          which you claim a rebate.
        </p>
        <p>You also confirm that apart from any spouse or dependents that you live with at this address</p>
        <ul>
          <li>• Hold a pensioner concession or Queensland Senior Card; or</li>
          <li>• Receive an income support payment but do not pay rent; or</li>
          <li>• Provide care and assistance but do not pay rent.`</li>
        </ul>
      </div>
    )
  } else if (['SA'].includes(state)) {
    concessionNote = `We cannot update your concession information directly, but you can do it via the Department for Communities and Social Inclusion. Customer can contact DCSI on Telephone 1800 307 758 or on the web Website: www.sa.gov.au/concessions.`
  }

  return concessionNote
}
