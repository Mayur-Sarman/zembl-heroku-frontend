import { OCRFile, OCRFileResult } from '../api/ocr'
import { extractPureBase64, toBase64 } from './file'

export const CODE_PATTERN = /\d{11}/
export const OCR_MIN_CONFIDENCE = 0.5

export const extractKeyPair = (ocrFileResult: OCRFileResult): Record<string, string> => {
  const pages = ocrFileResult?.document?.pages

  const mappedObject = pages?.reduce((prev, page) => {
    const pageData = page.formFields?.reduce((keyPairs, formData) => {
      const fieldName = formData?.fieldName?.textAnchor?.content?.trim?.()
      const fieldValue = formData?.fieldValue?.textAnchor?.content?.trim?.()

      return { ...keyPairs, [fieldName]: fieldValue }
    }, {})

    return { ...prev, ...pageData }
  }, {})

  return mappedObject
}

export const extractNMI = (ocrFileResult: OCRFileResult): string | undefined => {
  const keyPairs = extractKeyPair(ocrFileResult)
  console.log('ELECTRIC OCR KEYPAIR:', keyPairs)
  let nmi: string | undefined = extractNMIByKeypair(keyPairs)

  if (!nmi) {
    const possibleNMI = extractNMIByText(ocrFileResult.document.text)
    console.log('POSSIBLE NMI', possibleNMI)
    nmi = possibleNMI?.match(CODE_PATTERN)?.[0]
  }

  console.log('RESULT NMI:', nmi)

  return nmi
}

export const extractMIRN = (ocrFileResult: OCRFileResult): string | undefined => {
  const keyPairs = extractKeyPair(ocrFileResult)
  console.log('GAS OCR KEYPAIR:', keyPairs)
  let mirn: string | undefined = extractMIRNByKeypair(keyPairs)

  if (!mirn) {
    const possibleMIRN = extractMIRNByText(ocrFileResult.document.text)
    console.log('POSSIBLE MIRN', possibleMIRN)
    mirn = possibleMIRN?.match(CODE_PATTERN)?.[0]
  }

  console.log('RESULT MIRN:', mirn)

  return mirn
}

export const extractNMIByKeypair = (keyPairs: Record<string, string>): string | undefined => {
  const value: string | undefined =
    keyPairs['National Metering Identifier'] ||
    keyPairs['National Meter Identifier'] ||
    keyPairs['Meter Identifier'] ||
    keyPairs['(NMI)'] ||
    keyPairs.NMI ||
    keyPairs['NMI:']
  return value?.match(CODE_PATTERN)?.[0]
}

export const extractMIRNByKeypair = (keyPairs: Record<string, string>): string | undefined => {
  const value: string | undefined =
    keyPairs['Meter Installation Registration Number'] ||
    keyPairs['Installation Registration Number'] ||
    keyPairs['(MIRN)'] ||
    keyPairs.MIRN ||
    keyPairs['MIRN:']
  return value?.match(CODE_PATTERN)?.[0]
}

export const extractMIRNByText = (text: string) => {
  const splitted: string[] = text.split('\n')
  console.log(splitted)
  const filtered = splitted.reduce((prev, item, index, rest) => {
    const normalized = item.toLowerCase()
    return normalized.includes('meter installation') || normalized.includes('mirn')
      ? [...prev, item, rest[index + 1] ?? '', rest[index - 1] ?? '']
      : prev
  }, [] as string[])

  const result = filtered.find((item) => {
    return matchCodePattern(item)
  })
  console.log(filtered, result)

  return result
}

export const extractNMIByText = (text: string) => {
  const splitted: string[] = text.split('\n')
  //   console.log(splitted)
  const filtered = splitted.reduce((prev, item, index, rest) => {
    const normalized = item.toLowerCase()
    return normalized.includes('metering identifier') || normalized.includes('nmi')
      ? [...prev, item, rest[index + 1] ?? '', rest[index - 1] ?? '']
      : prev
  }, [] as string[])

  const result = filtered.find((item) => {
    return matchCodePattern(item)
  })
  console.log(filtered, result)

  return result
}

const matchCodePattern = (code: string) => {
  return CODE_PATTERN.test(code)
}

export const transformToOCRFile = async (file: File, mimeType = 'application/pdf') => {
  const base64File = await toBase64(file)
  const pureBase64 = extractPureBase64(base64File)
  return { mimeType, fileData: pureBase64 }
}

export interface OCRMutationPayload {
  file: OCRFile
  type?: string
}
