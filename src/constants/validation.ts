export const REQUIRED_FIELD_ERROR_TEXT = 'Enter a value'
export const TEXT_ONLY_ERROR_TEXT = 'Must be text only'
export const NUMBER_ONLY_ERROR_TEXT = 'Must be number only'
export const ABN_NUMBER_ERROR = 'Length must be 11 characters long.'

export const MIN_LENGTH_ERROR_TEXT = (length: number) => `Must be at least ${length} characters long.`
export const MAX_LENGTH_ERROR_TEXT = (length: number) => `Must be less than ${length} characters long.`
export const RANGE_LENGTH_ERROR_TEXT = (min: number, max: number) =>
  `Must be between ${min} and ${max} characters long.`
export const EXACT_LENGTH_ERROR_TEXT = (length: number) => `Must be exactly ${length} characters long.`

export const MAX_STD_TEXT_FIELD_LENGTH = 80
export const MAX_CUS_TEXT_FIELD_LENGTH = 255
export const MAX_STD_PHONE_FIELD_LENGTH = 11
export const MAX_STD_NUMBER_FIELD_LENGTH = 18
export const STD_EMAIL_PATTERN =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/
export const STD_ABN_PATTERN = /^[\s.]*([^\s.][\s.]*){11,11}$/
export const STD_NUMBER_PATTERN = /\+?\d+/

export const STANDARD_SF_TEXT_VALIDATION = {
  maxLength: {
    value: MAX_STD_TEXT_FIELD_LENGTH,
    message: MAX_LENGTH_ERROR_TEXT(MAX_STD_TEXT_FIELD_LENGTH),
  },
}

export const CUSTOM_SF_TEXT_VALIDATION = {
  maxLength: {
    value: MAX_CUS_TEXT_FIELD_LENGTH,
    message: MAX_LENGTH_ERROR_TEXT(MAX_CUS_TEXT_FIELD_LENGTH),
  },
}

export const REQUIRED_VALIDATION = {
  required: { value: true, message: 'Enter a value' },
}

export const CHECKBOX_REQUIRED_VALIDATION = {
  required: { value: true, message: 'Select a value' },
}

export const EMAIL_VALIDATION = {
  maxLength: {
    value: MAX_STD_TEXT_FIELD_LENGTH,
    message: MAX_LENGTH_ERROR_TEXT(MAX_STD_TEXT_FIELD_LENGTH),
  },
  pattern: {
    value: STD_EMAIL_PATTERN,
    message: 'Email must include at least one "@" and a domain portion after "@"',
  },
}

export const PHONE_VALIDATION = {
  maxLength: {
    value: MAX_STD_PHONE_FIELD_LENGTH,
    message: EXACT_LENGTH_ERROR_TEXT(MAX_STD_PHONE_FIELD_LENGTH),
  },
  minLength: {
    value: MAX_STD_PHONE_FIELD_LENGTH,
    message: 'Phone must begin with country code and followed by 9 digits',
  },
  pattern: {
    value: STD_NUMBER_PATTERN,
    message: NUMBER_ONLY_ERROR_TEXT,
  },
}

export const EIGTHTEEN_YEARS_OLD_VALIDATION = {
  max: {
    value: new Date().setFullYear(new Date().getFullYear() - 18),
    message: 'You must be 18 years of over.',
  },
}

export const ABN_NMI_MIRN_VALIDATION = {
  // maxLength: {
  //   value: 11,
  //   message: EXACT_LENGTH_ERROR_TEXT(11),
  // },
  // minLength: {
  //   value: 0,
  //   message: EXACT_LENGTH_ERROR_TEXT(11),
  // },
  pattern: {
    value: STD_ABN_PATTERN,
    message: ABN_NUMBER_ERROR,
  },
}

export const PASSPORT_VALIDATION = {
  maxLength: {
    value: 8,
    message: EXACT_LENGTH_ERROR_TEXT(8),
  },
  minLength: {
    value: 8,
    message: EXACT_LENGTH_ERROR_TEXT(8),
  },
}

export const getExactLengthValidation = (length: number) => ({
  maxLength: {
    value: length,
    message: EXACT_LENGTH_ERROR_TEXT(length),
  },
  minLength: {
    value: length,
    message: EXACT_LENGTH_ERROR_TEXT(length),
  },
})

export const DATE_MUST_FUTURE = {
  min: {
    value: new Date(),
    message: 'Date must be in the future.',
  },
}

export const DATE_MUST_MORE_THAN_TWO_DAY = {
  min: {
    value: new Date().setDate(new Date().getDate() + 2),
    message: 'New connections need a minimum of 2 days for electricity and 5 days for gas for connections to be set up (excluding weekend and public holidays)',
  }
}

export const DATE_MUST_IN_90_DAY = {
  max: {
    value: new Date().setDate(new Date().getDate() + 90),
    message: 'You can not select a date that is greater than 90 days in advance (excluding weekend and public holidays)',
  }
}

export const DATE_MUST_PAST = {
  max: {
    
    value: new Date(),
    message: 'Date must be in the past.',
  },
}

export interface ValidationObject {
  value: string | number | boolean | ((value: Date) => boolean) | Date
  message: string
}
