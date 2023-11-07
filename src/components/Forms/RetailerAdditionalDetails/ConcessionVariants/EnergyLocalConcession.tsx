import { Control } from 'react-hook-form'
import { NO_VALUE, YES_NO_OPTIONS, YES_VALUE } from '../../../../constants'
import AccordionCard from '../../../AccordionCard'
import ControllerRadioGroupInput from '../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../TextNote'

const EnergyLocalConcession = ({
  control,
  applyConcession,
  concessionConsent,
  concessionType,
}: EnergyLocalConcessionProps) => {
  return (
    <AccordionCard alwaysOpen open title="Concession" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        name="concession.concessionCardHolder"
        label="Are you applying for a concession or rebate?"
        control={control}
        options={YES_NO_OPTIONS}
      />

      {applyConcession === YES_VALUE ? (
        <>
          <TextNote>
            As requested, I’m adding the {concessionType} concession to this account. The Concession Terms are on Energy
            Locals website and a link to them will be included in your welcome email, or you can request a copy to be
            sent to you. Energy Locals is seeking your consent to collect concession card information from the
            Department of Human Services/Department of Veteran Affairs to validate your concession eligibility.
            <br />
            <br />
            This authority is only effective for the period that you are a customer of Energy Locals. You can revoke
            your consent at any time by contacting us. If you do not provide your consent, you may not be eligible for
            the concession. As we can’t validate your concession details from the Department of Human
            Services/Department of Veteran Affairs portal. You are required to notify us and your card issuer of any
            changes in your circumstances which may affect your eligibility for a concession.
          </TextNote>
          <ControllerRadioGroupInput
            label={
              'Do you understand and consent to Energy Locals accessing your information held by Department of Human Services/Department of Veteran Affairs?'
            }
            name="concession.concessionConsent"
            control={control}
            options={YES_NO_OPTIONS}
          />
        </>
      ) : null}

      {concessionConsent === NO_VALUE ? (
        <TextNote>
          You must consent to Energy Locals accessing your information held by the Department of Human Services /
          Department of Veterans Affairs to have your concession applied. Update your selection or please call Zembl on
          1300 957 721.
        </TextNote>
      ) : null}
    </AccordionCard>
  )
}

export default EnergyLocalConcession

interface EnergyLocalConcessionProps {
  control: Control
  concessionType?: string
  applyConcession?: string
  concessionConsent?: string
}
