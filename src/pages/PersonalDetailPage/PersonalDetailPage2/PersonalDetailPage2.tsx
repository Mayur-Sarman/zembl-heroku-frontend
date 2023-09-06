import { useForm } from 'react-hook-form'

import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import SecondaryAccountHolderForm from '../../../components/Forms/PersonalDetails/SecondaryAccountHolderForm'
import LifeSupportForm from '../../../components/Forms/PersonalDetails/LifeSupportForm'
import ReZemblForm from '../../../components/Forms/PersonalDetails/ReZemblForm'

const PersonalDetailPage2 = () => {
  // On load page get data from context
  const { handleSubmit, control, register, setValue } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    // Call API
    // Put data to context
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      <SecondaryAccountHolderForm control={control} register={register} setValue={setValue} />
      <LifeSupportForm register={register} setValue={setValue} />
      <ReZemblForm control={control} />

      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        <Button
          variant="outlined"
          onClick={() => navigate('/personal-detail-1')}
          className="text-zembl-p w-full lg:w-1/3 place-self-center"
        >
          Back
        </Button>
        <Button
          type="submit"
          // onClick={() => navigate('/bill-upload')}
          className="bg-zembl-action-primary text-zembl-p w-full lg:w-1/3 place-self-center"
        >
          Next
        </Button>
      </div>
    </form>
  )
}

export default PersonalDetailPage2
