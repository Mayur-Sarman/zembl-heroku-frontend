import { Controller, useForm } from 'react-hook-form'
import AccordionCard from '../../components/AccordionCard'
import PaperBillForm from './PaperBillForm'
import FileUploadInput from '../../components/Inputs/FileUploadInput'
import { useNavigate } from 'react-router-dom'
import RegistrationStep from '../../components/RegistrationStep'
import PageWrapper from '../../components/PageWrapper'
import { HAVE_PAPER_BILL, UPLOAD_BILL_TYPE_OPTIONS, UPLOAD_ELECTRICITY_BILL, UPLOAD_GAS_BILL } from '../../constants'
import PageNavigationActions from '../../components/PageNavigationActions'
import ControllerRadioGroupInput from '../../components/Inputs/ControllerRadioGroupInput'
import { REQUIRED_VALIDATION } from '../../constants/validation'

const BillUploadPage = () => {
  const { handleSubmit, control, setValue, watch, register } = useForm({ mode: 'all' })
  const navigate = useNavigate()

  const watchBillType: unknown = watch('billType', null)

  // const isUpload: boolean =
  //   typeof watchBillType === 'string' ? watchBillType.toLocaleLowerCase().startsWith('upload') : false

  const onSubmit = (data: Record<string, string>) => {
    console.log(data)

    navigate('/plans')
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <RegistrationStep currentStep={0} />
        <hr className="hidden lg:block" />

        <AccordionCard alwaysOpen open title="Bill Details">
          <div className="w-full flex flex-col gap-3 text-left">
            <ControllerRadioGroupInput
              control={control}
              name="billType"
              rules={REQUIRED_VALIDATION}
              options={UPLOAD_BILL_TYPE_OPTIONS}
            />
            {watchBillType === HAVE_PAPER_BILL ? (
              <PaperBillForm control={control} register={register} energyType="both" setValue={setValue} />
            ) : null}

            {watchBillType === UPLOAD_ELECTRICITY_BILL ? (
              <Controller
                name={`electricity.billFile`}
                control={control}
                rules={REQUIRED_VALIDATION}
                render={({ field, fieldState }) => {
                  return (
                    <FileUploadInput
                      labelText="Upload File"
                      labelClassName="mb-4"
                      dropzoneText="Click to upload or drag and drop"
                      helpText="PDF (MAX. 4MB)"
                      {...field}
                      error={fieldState.error}
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  )
                }}
              />
            ) : null}

            {watchBillType === UPLOAD_GAS_BILL ? (
              <Controller
                name={`gas.billFile`}
                control={control}
                rules={REQUIRED_VALIDATION}
                render={({ field, fieldState }) => {
                  return (
                    <FileUploadInput
                      labelText="Upload File"
                      labelClassName="mb-4"
                      dropzoneText="Click to upload or drag and drop"
                      helpText="PDF (MAX. 4MB)"
                      {...field}
                      error={fieldState.error}
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  )
                }}
              />
            ) : null}
          </div>
        </AccordionCard>

        <PageNavigationActions prevLink="/basic-info-2" />
      </form>
    </PageWrapper>
  )
}

export default BillUploadPage
