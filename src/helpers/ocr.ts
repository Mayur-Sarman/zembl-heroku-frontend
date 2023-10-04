import { OCRFile, OCRFileResult } from '../api/ocr'
import { extractPureBase64, toBase64 } from './file'

export const NMI_VALUE_PATTERN =
  /((N(AAA|BBB|CCC|DDD|EEE|FFF|GGG|TTT)|Q(AAA|(B\d{2})|CCC|DDD|EEE|FFF|GGG)|S(AAA)|V(AAA|BBB|CCC|DDD|EEE)|W(AAA)|N(KKK))([A-HJ-NP-VX-Z\d][A-HJ-NP-Z\d]{6}))|((T|V|Q|S)[A-HJ-NP-Z\d]{3}W[A-HJ-NP-Z\d]{6})|(NJJJNR[A-HJ-NP-Z\d]{5})|(8590[23]\d{6})|(T000000(([0-4]\d{3})|(500[01])))\d|(460810[0-8]|4708109)\d{4}|(320200|SASMPL|210200|650900)\d{5}|(30|31)\d{9}|(431|250|801)\d{8}|((7001|4001|4508|4204|4407|(410[234])|(200[12])|(8000)|(610[23])|(630[56])|(620[34])|(6001)|(640[78])|(800[1-9])|(8020)|(8021)|(7102)|(880[1-5]))\d{7})|(9\d{10})/

export const MIRN_VALUE_PATTERN = /(5[2-7]\d{8})/

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

const replaceInvalidCodeToken = (value: string | null | undefined) =>
  value?.replace(/[Oo]/g, '0')?.replace(/[Ii]/g, '1')

export const extractNMI = (ocrFileResult: OCRFileResult): string | undefined => {
  const keyPairs = extractKeyPair(ocrFileResult)
  console.log('ELECTRIC OCR KEYPAIR:', keyPairs)
  let nmi: string | undefined = extractNMIByKeypair(keyPairs)

  if (!nmi) {
    const possibleNMI = extractNMIByText(ocrFileResult.document.text)
    console.log('POSSIBLE NMI', possibleNMI)
    nmi = replaceInvalidCodeToken(possibleNMI)?.match(NMI_VALUE_PATTERN)?.[0]
  }

  console.log('RESULT NMI:', nmi)

  return nmi
}

export const extractNMIByKeypair = (keyPairs: Record<string, string>): string | undefined => {
  const regex = NMI_REGEX
  const keyPair = Object.entries(keyPairs).find(
    ([key, value]) => regex.test(key.toLowerCase()) && replaceInvalidCodeToken(value)?.match(NMI_VALUE_PATTERN)?.[0],
  )
  console.log('NMI MATCHING KEY PAIR:', keyPair)
  return keyPair?.[1]
}

export const extractNMIByText = (text: string) => {
  const splitted: string[] = text.split('\n')
  const filtered = splitted.reduce((prev, item, index, rest) => {
    const normalized = item.toLowerCase()
    return NMI_REGEX.test(normalized) ? [...prev, item, rest[index + 1] ?? '', rest[index - 1] ?? ''] : prev
  }, [] as string[])

  const result = filtered.find((item) => matchNMICodePattern(item))

  return result
}

export const extractMIRN = (ocrFileResult: OCRFileResult): string | undefined => {
  const keyPairs = extractKeyPair(ocrFileResult)
  console.log('GAS OCR KEYPAIR:', keyPairs)
  let mirn: string | undefined = extractMIRNByKeypair(keyPairs)

  if (!mirn) {
    const possibleMIRN = extractMIRNByText(ocrFileResult.document.text)
    console.log('POSSIBLE MIRN', possibleMIRN)
    mirn = replaceInvalidCodeToken(possibleMIRN ?? '')?.match(MIRN_VALUE_PATTERN)?.[0]
  }

  console.log('RESULT MIRN:', mirn)

  return mirn
}

export const extractMIRNByKeypair = (keyPairs: Record<string, string>): string | undefined => {
  const regex = MIRN_REGEX
  const keyPair = Object.entries(keyPairs).find(
    ([key, value]) => regex.test(key.toLowerCase()) && replaceInvalidCodeToken(value)?.match(MIRN_VALUE_PATTERN)?.[0],
  )
  console.log('MIRN MATCHING KEY PAIR:', keyPair)
  return keyPair?.[1]
}

export const extractMIRNByText = (text: string) => {
  const splitted: string[] = text.split('\n')
  const filtered = splitted.reduce((prev, item, index, rest) => {
    const normalized = item.toLowerCase()
    return MIRN_REGEX.test(normalized ?? '') ? [...prev, item, rest[index + 1] ?? '', rest[index - 1] ?? ''] : prev
  }, [] as string[])

  const result = filtered.find((item) => {
    return matchMIRNCodePattern(item)
  })

  return result
}

const matchNMICodePattern = (code: string) => {
  return NMI_VALUE_PATTERN.test(replaceInvalidCodeToken(code) ?? '')
}

const matchMIRNCodePattern = (code: string) => {
  return MIRN_VALUE_PATTERN.test(replaceInvalidCodeToken(code) ?? '')
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
