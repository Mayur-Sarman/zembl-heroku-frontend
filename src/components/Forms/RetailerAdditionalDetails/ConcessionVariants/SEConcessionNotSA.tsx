import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS, YES_VALUE } from '../../../../constants'
import AccordionCard from '../../../AccordionCard'
import ControllerRadioGroupInput from '../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../TextNote'
import ConcessionForm from '../../ConcessionForm'

const SEConcessionNotSA = ({
  control,
  state,
  onlyResidence,
  siteAddress,
  concessionCardHolder,
  concessionConsent,
}: SEConcessionNotSAProps) => {
  const isCardHolder = concessionCardHolder === YES_VALUE
  const isOnlyResidence = onlyResidence === YES_VALUE
  const isConsent = concessionConsent === YES_VALUE

  return (
    <AccordionCard alwaysOpen open title="Concession" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        name="concession.concessionCardHolder"
        label="Do you currently receive a government concession or rebate that can be added to your account?"
        control={control}
        options={YES_NO_OPTIONS}
      />
      {isCardHolder ? (
        <>
          <ConcessionForm control={control} />

          <ControllerRadioGroupInput
            label={`Is ${siteAddress} your principal place of residence and the only residence in the state for which the rebate is claimed?`}
            name="concession.onlyStateRebateResidence"
            control={control}
            options={YES_NO_OPTIONS}
          />

          {onlyResidence && isOnlyResidence ? (
            <>
              <TextNote>
                Just to let you know, Simply Energy will confirm your name, postcode, payment, concession details and
                eligibility with the Department of Human Services, Department of Veterans’ Affairs, and other government
                authorities, as required. Upon confirming your eligibility, any energy concessions that you are entitled
                to receive will be applied to your account’s.
                <br />
                <br />
                It is important that you let Simply Energy and your card issuer know of any changes in your
                circumstances which may affect your eligibility for a concession. This consent is valid while you are a
                customer of Simply Energy. At any point you can withdraw your consent, but please be aware that you may
                no longer be entitled to receive an energy concession.
                <br />
                <br />
                If you don’t want your information shared in this way, or withdraw consent, you must get proof of your
                details directly from the department.
              </TextNote>
              <ControllerRadioGroupInput
                label={'Do you consent to Simply Energy performing this check?'}
                name="concession.concessionConsent"
                control={control}
                options={YES_NO_OPTIONS}
              />
            </>
          ) : (
            <TextNote>
              The site address must be your principal place of residence to claim a concession rebate. Please call Zembl
              on 1300 957 721 for assistance.
            </TextNote>
          )}

          {['VIC', 'NSW'].includes(state ?? '') && !isConsent && concessionConsent ? (
            <TextNote>
              Without this consent we can not validate your concession eligiblity. Update your preference or please call
              Zembl on 1300 957 721 for assistance.
            </TextNote>
          ) : null}
        </>
      ) : null}
    </AccordionCard>
  )
}

export default SEConcessionNotSA

interface SEConcessionNotSAProps {
  control: Control
  state: string
  onlyResidence: string
  siteAddress: string
  concessionCardHolder: string
  concessionConsent: string
}
