import { Control, Controller } from 'react-hook-form'
import { GOOGLE_API_KEY } from '../../constants'

import { Typography } from '@material-tailwind/react'
import ReactGoogleAutocomplete from 'react-google-autocomplete'
import { DEFAULT_INPUT_CLASS_NAME } from '.'
import { GoogleMapExtractedComponents, extractAddressComponent } from '../../helpers/googleMap'
import { ChangeEvent, ReactNode, useState } from 'react'
import ErrorTextMessage from '../ErrorTextMessage'

const GOOGLE_ADDRESS_OPTIONS = {
  types: [],
  fields: ['formatted_address', 'address_components', 'name'],
}

const GoogleAddressInput = ({
  name,
  control,
  containerClassName,
  inputClassName,
  textLabel,
  rules,
  displayAs,
  disabled,
  onSelectedCallback,
}: GoogleAddressInputProps) => {
  const [valueDisplay, setValueDisplay] = useState('')
  const textLabelDisplay = textLabel ? (
    <Typography
      variant="small"
      className={`mb-2 pl-1 ${rules?.required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}`}
    >
      {textLabel}
    </Typography>
  ) : null

  const onChangeHandler = (fieldValue: google.maps.places.PlaceResult, onChange: (event: unknown) => unknown) => {
    const extractedAddress = extractAddressComponent(fieldValue)
    onChange(extractedAddress)
    if (displayAs) setValueDisplay(displayAs(extractedAddress) as string)
    if (onSelectedCallback) onSelectedCallback(extractedAddress)
  }

  const onBlurHandler = (fieldValue: string, onChange: (event: unknown) => unknown) => {
    setValueDisplay(fieldValue)
    if (!fieldValue) onChange('')
  }

  return (
    <div className={`text-left w-full ${containerClassName}`}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          return (
            <div className={`w-full ${containerClassName ?? ''}`}>
              {textLabelDisplay}
              <ReactGoogleAutocomplete
                value={valueDisplay}
                name={field.name}
                ref={field.ref}
                onPlaceSelected={(e) => onChangeHandler(e, field.onChange)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValueDisplay(e.target.value)}
                onBlur={(e: ChangeEvent<HTMLInputElement>) => onBlurHandler(e.target.value, field.onChange)}
                apiKey={GOOGLE_API_KEY}
                options={GOOGLE_ADDRESS_OPTIONS}
                className={`${DEFAULT_INPUT_CLASS_NAME} ${inputClassName}`}
                disabled={disabled}
              />
              {fieldState.error ? (
                <div className="mt-1 px-1 text-left">
                  <ErrorTextMessage>{fieldState.error.message ?? ''}</ErrorTextMessage>
                </div>
              ) : null}
            </div>
          )
        }}
      />
    </div>
  )
}

interface GoogleAddressInputProps {
  name: string
  required?: boolean
  control: Control
  rules?: Record<string, unknown>
  containerClassName?: string
  inputClassName?: string
  textLabel?: string
  displayAs?: (value: GoogleMapExtractedComponents | null) => ReactNode
  disabled?: boolean
  onSelectedCallback?: (value: GoogleMapExtractedComponents | null) => unknown
}

export default GoogleAddressInput
