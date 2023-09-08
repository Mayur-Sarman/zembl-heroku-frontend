import { PencilSquareIcon } from '@heroicons/react/20/solid'
import AccordionCard from './AccordionCard'
import { Typography } from '@material-tailwind/react'
import FullPlanCard from './FullPlanCard'
import { MouseEventHandler, useContext } from 'react'
import RegistrationContext from '../contexts/RegistrationContext'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'
import { Control, FieldValues, UseFormRegister } from 'react-hook-form'
import ReZemblForm from './Forms/PersonalDetails/ReZemblForm'

const ICON_CLASS_NAME = 'w-4 h-4'
const MOCKUP_HTML = `
<p><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b> Sed condimentum pretium maximus. Maecenas vulputate sollicitudin sem, in sollicitudin ante laoreet eu. Vivamus quis ante laoreet, vestibulum nisi quis, ornare libero. Ut semper neque vel lectus venenatis, a pellentesque nisl imperdiet. Etiam luctus elementum quam vitae dictum. Etiam convallis dapibus felis, sed tempus velit blandit non. Morbi ornare nunc accumsan est mollis aliquet. Quisque sodales scelerisque lectus eu sagittis. Suspendisse blandit ante quis quam iaculis, in porta quam egestas. Nulla in suscipit est. Curabitur id tempor neque. Cras non mauris ultricies, posuere purus vel, aliquet ex. Duis molestie lacus ut arcu auctor aliquam ut nec eros.</p>
<p><i>Nullam porta sem ac magna convallis condimentum. Ut eu augue nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</i> Nulla mattis risus sed sodales feugiat. Aliquam eu lorem venenatis, dignissim est nec, molestie risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi non malesuada metus. Nam porttitor a ante nec mattis. Aenean id felis in erat tempor volutpat.</p>
<p>Morbi nunc mi, porta ut est ac, suscipit tempor mauris. <pre>Nullam sed blandit neque, vitae scelerisque mi. Ut ut consectetur libero.</pre> Sed vel leo pellentesque, tempus tortor eu, semper arcu. Nullam elementum sit amet justo sit amet pharetra. Nulla eu sem sem. Aliquam et vulputate lacus, id ultricies libero. Maecenas ullamcorper convallis erat, eleifend tristique justo aliquam sed.</p>
<p><span style='color: red; font-size: 18px; font-weight: 700'>Integer eleifend pretium tristique.</span> Aenean euismod, ex quis commodo tempus, arcu tellus convallis ipsum, nec malesuada enim risus vulputate est. Praesent faucibus dignissim tellus et maximus. Vivamus viverra, velit quis maximus congue, neque lacus venenatis orci, vitae tristique lectus nisl vitae arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In ut risus venenatis, euismod nisl sit amet, dictum risus. Maecenas nisl urna, commodo rhoncus porttitor eget, tincidunt sed mauris. Quisque quis dui pharetra, convallis elit sit amet, faucibus leo. Ut convallis sit amet elit imperdiet bibendum. Vestibulum nec turpis est. Praesent in leo vitae purus vulputate ornare ac eget neque. Etiam in sodales risus, et fringilla purus. Donec condimentum a turpis sit amet porttitor.</p>`

const SelectedPlans = ({ title, onEditClick, register, control }: SelectedPlansProps) => {
  const { registrationData } = useContext(RegistrationContext)

  const titleDisplay = (
    <div className="flex items-center w-full justify-between">
      <Typography variant="h6">{title}</Typography>
      <div
        tabIndex={0}
        onKeyDown={undefined}
        role="button"
        onClick={onEditClick}
        className="flex items-center gap-2 bg-transparent border-transparent shadow-none text-zembl-p pointer-events-auto"
      >
        <PencilSquareIcon className={ICON_CLASS_NAME} />
        <Typography className="text-sm">Edit</Typography>
      </div>
    </div>
  )

  return (
    <AccordionCard open alwaysOpen title={titleDisplay}>
      <div className="grid grid-cols-1 gap-6 text-left">
        {registrationData.energyType?.energyType !== GAS_VALUE ? (
          <FullPlanCard
            energyType={ELECTRICITY_VALUE}
            brandIconSrc="https://logos-world.net/wp-content/uploads/2021/08/Among-Us-Logo.png"
            planName="Among Us Red Corp"
            termAndConditions={MOCKUP_HTML}
            register={register}
          />
        ) : null}
        {registrationData.energyType?.energyType !== ELECTRICITY_VALUE ? (
          <FullPlanCard
            energyType={GAS_VALUE}
            brandIconSrc="https://i.redd.it/wyqn5yu8x7o51.png"
            planName="Among Us Blue Corp"
            termAndConditions={MOCKUP_HTML}
            register={register}
          />
        ) : null}
        <ReZemblForm control={control} register={register} />
      </div>
    </AccordionCard>
  )
}

interface SelectedPlansProps {
  title: string
  onEditClick: MouseEventHandler
  register: UseFormRegister<FieldValues>
  control: Control
}

export default SelectedPlans
