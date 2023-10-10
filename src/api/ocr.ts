import { PROCESS_OCR_ENDPOINT } from '../constants'
import { performPostRequest } from '../helpers'

export const postUploadOCR = async (ocrFile: OCRFile, token: string) => {
  const response = await performPostRequest(PROCESS_OCR_ENDPOINT, ocrFile, token)
  return response.data as OCRFileResult
}

export interface OCRFile {
  mimeType: string
  fileData: string
}

export interface OCRFileResult {
  document: OCRDocument
}

interface OCRDocumentPage {
  pageNumber: number
  formFields: FormField[]
}

interface TextAnchor {
  content: string
}

interface TextInfo {
  textAnchor: TextAnchor
  confidence: number
}

interface FormField {
  fieldName: TextInfo
  fieldValue: TextInfo
}

interface OCRDocument {
  uri?: string
  mimeType?: string
  text: string
  pages: OCRDocumentPage[]
}
