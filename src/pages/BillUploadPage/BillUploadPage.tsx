import { Controller, FieldValues, useForm } from 'react-hook-form'
import AccordionCard from '../../components/AccordionCard'
import PaperBillForm from './PaperBillForm'
import FileUploadInput from '../../components/Inputs/FileUploadInput'
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
  UPLOAD_GAS_BILL
} from '../../constants'
import PageNavigationActions from '../../components/PageNavigationActions'
import ControllerRadioGroupInput from '../../components/Inputs/ControllerRadioGroupInput'
import { REQUIRED_VALIDATION } from '../../constants/validation'
import { MAX_FILE_SIZE, PDF_FILE_TYPE } from '../../constants/file'
import { useRegistration } from '../../hooks/useRegistration'
import { extractMIRN, extractNMI, transformToOCRFile } from '../../helpers/ocr'
import { useToast } from '../../hooks'
import { buildCreateAccountPayload } from '../../api/account'
import { getPhoneNumber } from '../../helpers/formatter'

const SUPPORTED_FILE_TYPES = [PDF_FILE_TYPE].join(',')

const BillUploadPage = () => {
  const { fireAlert } = useToast()
  const { registrationData, ocrFileMutation, createAccountMutation, setRegistrationData } = useRegistration()
  const { handleSubmit, control, setValue, watch, formState } = useForm({
    defaultValues: registrationData as FieldValues,
    mode: 'all',
  })

  const watchBillFileType: unknown = watch('billFileType', null)

  const fileValidation = (value: FileList) => {
    const file = value?.[0] ?? null
    if (!file) return true
    if (file.size > MAX_FILE_SIZE) return 'File size must be less than 15MB.'
    if (!file?.type || !SUPPORTED_FILE_TYPES.includes(file.type)) return 'File type must be PDF only.'
    return true
  }

  const onFileChange = async (files: FileList | null , energyType: string) => {
    if (!files) {
      return;
    }

    const file = files[0]

    if( energyType === ELECTRICITY_VALUE) {
      const electricOCRFile = await transformToOCRFile(file)
        const electricOCRResponse = await ocrFileMutation.mutateAsync({
          file: electricOCRFile,
          type: ELECTRICITY_VALUE,
        })

      const nmi = extractNMI(electricOCRResponse)

      if (!nmi && registrationData?.energyType !== BOTH_VALUE) {
        setValue('billFileType', HAVE_PAPER_BILL)
        fireAlert({
          children: 'We cannot extract your NMI/MIRN from the provided bill. Please enter it manually.',
          type: 'info',
          duration: 5000,
        })
        return
      }
      setValue('nmi', nmi)

    } else if (energyType === GAS_VALUE) {
      const gasOCRFile = await transformToOCRFile(file)
        const electricOCRResponse = await ocrFileMutation.mutateAsync({
          file: gasOCRFile,
          type: ELECTRICITY_VALUE,
        })
        
      const mirn = extractMIRN(electricOCRResponse)
      
      if(!mirn && registrationData?.energyType !== BOTH_VALUE) {
        setValue('billFileType', HAVE_PAPER_BILL)
        fireAlert({
          children: 'We cannot extract your NMI/MIRN from the provided bill. Please enter it manually.',
          type: 'info',
          duration: 5000,
        })
        return
      }
      setValue('mirn', mirn)
    }
    // const nmiData: unknown = watch('nmi', null)
    // const mirnData: unknown = watch('mirn', null)

    // const nmi: string = nmiData as string;
    // const mirn: string =mirnData as string;

    // if (ZEMBL_DEBUG_MODE) {
    //   console.log('registrationData?.energyType:', registrationData?.energyType)
    //   console.log('NMI, MIRN:', nmi, ',', mirn)
    // }
    

    // if (registrationData?.energyType === BOTH_VALUE && nmiData != null && mirnData != null) {
    //   const buildedData = buildCreateAccountPayload(registrationData, nmi, mirn)
    //   setRegistrationData((prev) => ({
    //     ...prev,
    //     nmiData,
    //     mirnData,
    //     phone: getPhoneNumber(registrationData?.phone),
    //     mobile: getPhoneNumber(registrationData?.phone),
    //   }))
    //   return createAccountMutation.mutate(buildedData)
    // }
  }

  const onSubmit = (data: Partial<RegistrationData>) => {
    const nmi: string | undefined = data?.nmi
    const mirn: string | undefined = data?.mirn
    console.log('nmi, mirn', nmi, mirn)
    if((registrationData?.energyType === BOTH_VALUE && (!nmi || !mirn)) || (!nmi && !mirn)) {
      setValue('billFileType', HAVE_PAPER_BILL)
      fireAlert({
        children: 'We cannot extract your NMI/MIRN from the provided bill. Please enter it manually.',
        type: 'info',
        duration: 5000,
      })
      ocrFileMutation.reset()
      return
    }

    if (data.billFileType === HAVE_PAPER_BILL) {
      const buildedData = buildCreateAccountPayload(data, nmi, mirn)
      setRegistrationData((prev) => ({
        ...prev,
        ...data,
        phone: getPhoneNumber(data.phone),
        mobile: getPhoneNumber(data.phone),
      }))
      return createAccountMutation.mutate(buildedData)
    } else {
      const buildedData = buildCreateAccountPayload(data, nmi, mirn)
      setRegistrationData((prev) => ({
        ...prev,
        ...data,
        nmi,
        mirn,
        phone: getPhoneNumber(data.phone),
        mobile: getPhoneNumber(data.phone),
      }))
      return createAccountMutation.mutate(buildedData)
    }
  }

  let uploadOptions = UPLOAD_BILL_TYPE_OPTIONS
  if (registrationData?.energyType !== BOTH_VALUE) {
    uploadOptions = UPLOAD_BILL_TYPE_OPTIONS.filter((item) => {
      if (!registrationData?.energyType) return false
      return item.value.includes(registrationData?.energyType) || item.value === HAVE_PAPER_BILL
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
            {watchBillFileType === HAVE_PAPER_BILL && registrationData?.energyType ? (
              <PaperBillForm control={control} energyType={registrationData?.energyType} setValue={setValue} />
            ) : null}

            {registrationData?.energyType !== GAS_VALUE ? (
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
                      onChange={(files: FileList | null) => {
                        field.onChange(files)
                       void onFileChange(files, ELECTRICITY_VALUE)
                      }}
                    />
                  )
                }}
              />
            ) : null}

            {registrationData?.energyType !== ELECTRICITY_VALUE ? (
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
                      onChange={(files: FileList | null) => {
                        field.onChange(files)
                        void onFileChange(files, GAS_VALUE)
                      }}
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
