import { Controller, useForm } from 'react-hook-form'
import AccordionCard from '../../components/AccordionCard'
import RadioGroupInput, { InputOptions } from '../../components/Inputs/RadioGroupInput'
import PaperBillForm from './PaperBillForm'
import FileUploadInput from '../../components/Inputs/FileUploadInput'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import RegistrationStep from '../../components/RegistrationStep'
import PageWrapper from '../../components/PageWrapper'

const UPLOAD_BILL_TYPE_OPTIONS: InputOptions[] = [
  { value: 'Upload PDF Bill', label: 'Upload PDF Bill' },
  { value: 'Have Paper Bill', label: 'Have Paper Bill' },
  { value: 'Upload Electricity Bill', label: 'Upload Electricity Bill' },
  { value: 'Upload Gas Bill', label: 'Upload Gas Bill' },
]

const BillUploadPage = () => {
  const { handleSubmit, control, setValue, watch, register } = useForm()
  const navigate = useNavigate()

  const watchBillType: unknown = watch('billType', null)

  const isUpload: boolean =
    typeof watchBillType === 'string' ? watchBillType.toLocaleLowerCase().startsWith('upload') : false

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <div className="lg:h-32 lg:py-3 lg:px-14 lg:mt-6 w-full">
          <div className="hidden lg:block">
            <RegistrationStep currentStep={0} />
          </div>
        </div>

        <hr className="hidden lg:block" />
        <AccordionCard alwaysOpen open title="Bill & Messages">
          <div className="w-full flex flex-col gap-3 text-left">
            <Controller
              control={control}
              name="billType"
              render={({ field }) => (
                <RadioGroupInput
                  {...field}
                  label="How would you like to receive your bills and other notices, like disconnection warnings and price change notifications?"
                  values={[field.value]}
                  options={UPLOAD_BILL_TYPE_OPTIONS}
                  buttonContainerClassName="w-full lg:w-1/2 p-1"
                  optionsContainerClassName="inline-flex flex-wrap"
                />
              )}
            />
            {watchBillType === 'Have Paper Bill' ? (
              <PaperBillForm control={control} register={register} energyType="both" setValue={setValue} />
            ) : null}

            {isUpload ? (
              <FileUploadInput
                labelText="Upload File"
                labelClassName="mb-4"
                dropzoneText="Click to upload or drag and drop"
                helpText="SVG, PNG, JPG or GIF (MAX. 800x400px)"
                {...register('billFile')}
                onChange={(e) => setValue('billFile', e.target.files)}
              />
            ) : null}
          </div>
        </AccordionCard>

        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <Button
            variant="outlined"
            onClick={() => navigate('/basic-info-2')}
            className="text-zembl-p w-full lg:w-1/3 place-self-center"
          >
            Back
          </Button>
          <Button
            type="submit"
            onClick={() => navigate('/plans')}
            className="bg-zembl-action-primary text-zembl-p w-full lg:w-1/3 place-self-center"
          >
            Next
          </Button>
        </div>
      </form>
    </PageWrapper>
  )
}

export default BillUploadPage
