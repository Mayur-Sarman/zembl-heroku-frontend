import { FormEventHandler, MouseEventHandler, useCallback, useState } from 'react'
import AccordionCard from '../AccordionCard'
import RadioGroupInput, { InputOptions } from './RadioGroupInput'
import { Typography } from '@material-tailwind/react'
import EditActionButton from '../Buttons/EditActionButton'
import { FieldError } from 'react-hook-form'
import ErrorTextMessage from '../ErrorTextMessage'

const PERFERENCES_OPTIONS: InputOptions[] = [
  { value: 'Green or Carbon Neutral', label: 'Green or Carbon Neutral' },
  { value: 'Australian Owned', label: 'Australian Owned' },
  { value: 'Lowest Price', label: 'Lowest Price' },
  { value: 'Fixed Price', label: 'Fixed Price' },
  { value: 'Local Customer Service', label: 'Local Customer Service' },
  { value: 'Life Support', label: 'Life Support' },
  { value: 'Solar at Property', label: 'Solar at Property' },
  { value: 'Email Notifications', label: 'Email Notifications' },
  { value: 'No Preference', label: 'No Preference' },
]

const PreferenceSelector = ({
  preferences,
  onChange,
  editable,
  title = 'Your Preferences',
  label = "What's important to you?",
  error,
  required,
}: PreferenceSelectorProps) => {
  const [isEditing, setIsEditing] = useState(!editable)

  const onEditClickHandler: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsEditing((prev) => !prev)
  }, [])

  const editButton = editable ? (
    <EditActionButton isEditing={isEditing} onEditClickHandler={onEditClickHandler} />
  ) : null

  const titleDisplay = (
    <div className={`flex items-center w-full justify-between`}>
      <Typography variant="h6">{title}</Typography>
      {editButton}
    </div>
  )

  return (
    <AccordionCard alwaysOpen open title={titleDisplay}>
      <div className="w-full flex flex-col gap-3 text-left">
        <RadioGroupInput
          label={label}
          required={required}
          disabled={!isEditing}
          values={preferences}
          onChange={onChange}
          options={PERFERENCES_OPTIONS}
          buttonContainerClassName="w-full md:w-1/3 p-1"
          optionsContainerClassName="inline-flex !flex-wrap gap-0"
        />
        {error ? (
          <div className="mt-1 px-1 text-left">
            <ErrorTextMessage>{error.message ?? ''}</ErrorTextMessage>
          </div>
        ) : null}
      </div>
    </AccordionCard>
  )
}

export interface PreferenceSelectorProps {
  label?: string
  title?: string
  preferences: string[]
  onChange: FormEventHandler<HTMLButtonElement>
  editable?: boolean
  error?: FieldError
  required?: boolean
}

export default PreferenceSelector
