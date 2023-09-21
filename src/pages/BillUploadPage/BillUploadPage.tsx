import { Controller, FieldValues, useForm } from 'react-hook-form'
import AccordionCard from '../../components/AccordionCard'
import PaperBillForm from './PaperBillForm'
import FileUploadInput from '../../components/Inputs/FileUploadInput'
// import { useNavigate } from 'react-router-dom'
import RegistrationStep from '../../components/RegistrationStep'
import PageWrapper from '../../components/PageWrapper'
import {
  BOTH_VALUE,
  ELECTRICITY_VALUE,
  GAS_VALUE,
  HAVE_PAPER_BILL,
  RegistrationData,
  UPLOAD_BILL_TYPE_OPTIONS,
  UPLOAD_ELECTRICITY_BILL,
  UPLOAD_GAS_BILL,
} from '../../constants'
import PageNavigationActions from '../../components/PageNavigationActions'
import ControllerRadioGroupInput from '../../components/Inputs/ControllerRadioGroupInput'
import { REQUIRED_VALIDATION } from '../../constants/validation'
import { MAX_FILE_SIZE, PDF_FILE_TYPE } from '../../constants/file'
import { useRegistration } from '../../hooks/useRegistration'
import { extractMIRN, extractNMI, transformToOCRFile } from '../../helpers/ocr'
import { useToast } from '../../hooks'

const SUPPORTED_FILE_TYPES = [PDF_FILE_TYPE].join(',')

const BillUploadPage = () => {
  const { fireAlert } = useToast()
  const { registrationData, ocrFileMutation, setRegistrationData } = useRegistration()
  const { handleSubmit, control, setValue, watch, formState } = useForm({
    defaultValues: registrationData as FieldValues,
    mode: 'all',
  })
  // const navigate = useNavigate()

  const watchBillFileType: unknown = watch('billFileType', null)

  const fileValidation = (value: FileList) => {
    const file = value?.[0] ?? null
    if (!file) return true
    if (file.size > MAX_FILE_SIZE) return 'File size must be less than 15MB.'
    if (!file?.type || !SUPPORTED_FILE_TYPES.includes(file.type)) return 'File type must be PDF only.'
    return true
  }

  const onSubmit = async (data: Partial<RegistrationData>) => {
    console.log(data)

    let nmi: string | undefined = data?.nmi as string
    let mirn: string | undefined = data?.mirn as string
    // let buildedData = data

    if (data.billFileType === HAVE_PAPER_BILL) {
      // buildedData = { ...data }
      // MUTEAT
    }

    let shouldSwitchHavePaperBill = false
    try {
      if (data.electricityBillInfo?.billFiles?.length) {
        const electricOCRFile = await transformToOCRFile(data.electricityBillInfo.billFiles[0])
        const electricOCRResponse = await ocrFileMutation.mutateAsync({
          file: electricOCRFile,
          type: ELECTRICITY_VALUE,
        })

        nmi = extractNMI(electricOCRResponse)
      }

      if (data.gasBillInfo?.billFiles?.length) {
        const gasOCRFile = await transformToOCRFile(data.gasBillInfo.billFiles[0])
        const gasOCRResponse = await ocrFileMutation.mutateAsync({ file: gasOCRFile, type: GAS_VALUE })

        mirn = extractMIRN(gasOCRResponse)
      }

      shouldSwitchHavePaperBill =
        (!nmi && registrationData.energyType !== GAS_VALUE) ||
        (!mirn && registrationData.energyType !== ELECTRICITY_VALUE)
    } catch (error) {
      fireAlert({
        children: 'We cannot extract your NMI/MIRN from the provided bill. Please enter it manually.',
        type: 'info',
      })
      shouldSwitchHavePaperBill = true
    }

    setRegistrationData((prev) => ({
      ...prev,
      nmi,
      mirn,
      billFileType: shouldSwitchHavePaperBill ? HAVE_PAPER_BILL : registrationData.billFileType,
    }))
  }

  let uploadOptions = UPLOAD_BILL_TYPE_OPTIONS
  if (registrationData.energyType !== BOTH_VALUE) {
    uploadOptions = UPLOAD_BILL_TYPE_OPTIONS.filter((item) => {
      if (!registrationData.energyType) return false
      return item.value.includes(registrationData.energyType)
    })
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
              name="billFileType"
              rules={REQUIRED_VALIDATION}
              options={uploadOptions}
            />
            {watchBillFileType === HAVE_PAPER_BILL && registrationData.energyType ? (
              <PaperBillForm control={control} energyType={registrationData.energyType} setValue={setValue} />
            ) : null}

            {registrationData.energyType !== GAS_VALUE ? (
              <Controller
                name={`electricityBillInfo.billFiles`}
                control={control}
                rules={{
                  validate: fileValidation,
                }}
                render={({ field, fieldState }) => {
                  if (watchBillFileType !== UPLOAD_ELECTRICITY_BILL) return <></>
                  return (
                    <FileUploadInput
                      labelText="Upload File"
                      labelClassName="mb-4"
                      dropzoneText="Click to upload or drag and drop"
                      helpText="PDF (MAX. 4MB)"
                      accept={PDF_FILE_TYPE}
                      {...field}
                      error={fieldState.error}
                      onChange={(files: FileList | null) => field.onChange(files)}
                    />
                  )
                }}
              />
            ) : null}

            {registrationData.energyType !== ELECTRICITY_VALUE ? (
              <Controller
                name={`gasBillInfo.billFiles`}
                control={control}
                rules={{
                  validate: fileValidation,
                }}
                render={({ field, fieldState }) => {
                  if (watchBillFileType !== UPLOAD_GAS_BILL) return <></>
                  return (
                    <FileUploadInput
                      labelText="Upload File"
                      labelClassName="mb-4"
                      dropzoneText="Click to upload or drag and drop"
                      helpText="PDF (MAX. 4MB)"
                      accept={PDF_FILE_TYPE}
                      {...field}
                      error={fieldState.error}
                      onChange={(files: FileList | null) => field.onChange(files)}
                    />
                  )
                }}
              />
            ) : null}
          </div>
        </AccordionCard>

        <PageNavigationActions prevLink="/basic-info-2" nextDisabled={!formState.isValid} />
      </form>
    </PageWrapper>
  )
}

export default BillUploadPage
