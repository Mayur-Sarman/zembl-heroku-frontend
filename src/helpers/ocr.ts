import { OCRFile, OCRFileResult } from '../api/ocr'
import { extractPureBase64, toBase64 } from './file'

export const CODE_PATTERN = /\d{11}/
export const NMI_REGEX = /(national\s(metering|meter)\sid(entifier)?)|((\W|\s)?nmi(\W|\s)?)/g
export const MIRN_REGEX =
  /(meter)\s(identification|installation)\s(registration|reference)\s(number)|((\W|\s)?mirn(\W|\s)?)/g

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
  console.log('PERF OVERALL NMI START:', performance.now())
  const keyPairs = extractKeyPair(ocrFileResult)
  console.log('ELECTRIC OCR KEYPAIR:', keyPairs)
  let nmi: string | undefined = extractNMIByKeypair(keyPairs)

  if (!nmi) {
    const possibleNMI = extractNMIByText(ocrFileResult.document.text)
    console.log('POSSIBLE NMI', possibleNMI)
    nmi = possibleNMI?.match(CODE_PATTERN)?.[0]
  }

  console.log('RESULT NMI:', nmi)

  console.log('PERF OVERALL NMI END:', performance.now())
  return nmi
}

export const extractNMIByKeypair = (keyPairs: Record<string, string>): string | undefined => {
  console.log('PERF NMI BY KP START:', performance.now())
  const regex = NMI_REGEX
  const keyPair = Object.entries(keyPairs).find(
    ([key, value]) => regex.test(key.toLowerCase()) && value?.match(CODE_PATTERN)?.[0],
  )
  console.log('NMI MATCHING KEY PAIR:', keyPair)
  console.log('PERF NMI BY KP END:', performance.now())
  return keyPair?.[1]
}

export const extractNMIByText = (text: string) => {
  console.log('PERF NMI BY TEXT START:', performance.now())
  const splitted: string[] = text.split('\n')
    console.log(splitted)
  const filtered = splitted.reduce((prev, item, index, rest) => {
    const normalized = item.toLowerCase()
    return NMI_REGEX.test(normalized) ? [...prev, item, rest[index + 1] ?? '', rest[index - 1] ?? ''] : prev
  }, [] as string[])

  const result = filtered.find((item) => matchCodePattern(item))
  console.log(filtered, result)

  console.log('PERF NMI BY TEXT END:', performance.now())
  return result
}

export const extractMIRN = (ocrFileResult: OCRFileResult): string | undefined => {
  console.log('PERF OVERALL MIRN START:', performance.now())
  const keyPairs = extractKeyPair(ocrFileResult)
  console.log('GAS OCR KEYPAIR:', keyPairs)
  let mirn: string | undefined = extractMIRNByKeypair(keyPairs)

  if (!mirn) {
    const possibleMIRN = extractMIRNByText(ocrFileResult.document.text)
    console.log('POSSIBLE MIRN', possibleMIRN)
    mirn = possibleMIRN?.match(CODE_PATTERN)?.[0]
  }

  console.log('RESULT MIRN:', mirn)
  console.log('PERF OVERALL MIRN END:', performance.now())

  return mirn
}

export const extractMIRNByKeypair = (keyPairs: Record<string, string>): string | undefined => {
  console.log('PERF MIRN BY KP START:', performance.now())
  const regex = MIRN_REGEX
  const keyPair = Object.entries(keyPairs).find(
    ([key, value]) => regex.test(key.toLowerCase()) && value?.match(CODE_PATTERN)?.[0],
  )
  console.log('MIRN MATCHING KEY PAIR:', keyPair)
  console.log('PERF MIRN BY KP END:', performance.now())
  return keyPair?.[1]
}

export const extractMIRNByText = (text: string) => {
  console.log('PERF MIRN BY TEXT START:', performance.now())

  const splitted: string[] = text.split('\n')
  console.log(splitted)
  const filtered = splitted.reduce((prev, item, index, rest) => {
    const normalized = item.toLowerCase()
    return MIRN_REGEX.test(normalized) ? [...prev, item, rest[index + 1] ?? '', rest[index - 1] ?? ''] : prev
  }, [] as string[])

  const result = filtered.find((item) => {
    return matchCodePattern(item)
  })
  console.log(filtered, result)

  console.log('PERF MIRN BY TEXT END:', performance.now())
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
