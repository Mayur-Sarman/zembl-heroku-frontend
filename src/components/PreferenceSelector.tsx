import { FormEventHandler, MouseEventHandler, useCallback, useState } from 'react'
import AccordionCard from './AccordionCard'
import RadioGroupInput, { InputOptions } from './Inputs/RadioGroupInput'
import { Typography } from '@material-tailwind/react'
import { CheckCircleIcon, PencilSquareIcon } from '@heroicons/react/20/solid'

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

const ICON_CLASS_NAME = 'w-4 h-4'

const PreferenceSelector = ({
  preferences,
  onChange,
  editable,
  title = 'Your Preferences',
  label = "What's important to you?",
}: PreferenceSelectorProps) => {
  const [isEditing, setIsEditing] = useState(!editable)

  const onEditClickHandler: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsEditing((prev) => !prev)
  }, [])

  const editButton = editable ? (
    <div
      tabIndex={0}
      onKeyDown={undefined}
      role="button"
      onClick={onEditClickHandler}
      className="flex items-center gap-2 bg-transparent border-transparent shadow-none text-zembl-p pointer-events-auto"
    >
      {isEditing ? <CheckCircleIcon className={ICON_CLASS_NAME} /> : <PencilSquareIcon className={ICON_CLASS_NAME} />}
      <Typography className="text-sm">{isEditing ? 'Save' : 'Edit'}</Typography>
    </div>
  ) : null

  const titleDisplay = (
    <div className="flex items-center w-full justify-between">
      <Typography variant="h6">{title}</Typography>
      {editButton}
    </div>
  )

  return (
    <AccordionCard alwaysOpen open title={titleDisplay}>
      <div className="w-full flex flex-col gap-3 text-left">
        <RadioGroupInput
          label={label}
          disabled={!isEditing}
          values={preferences}
          onChange={onChange}
          options={PERFERENCES_OPTIONS}
          buttonContainerClassName="w-full md:w-1/3 p-1"
          optionsContainerClassName="inline-flex flex-wrap"
        />
      </div>
    </AccordionCard>
  )
}

interface PreferenceSelectorProps {
  label?: string
  title?: string
  preferences: string[]
  onChange: FormEventHandler<HTMLButtonElement>
  editable?: boolean
}

export default PreferenceSelector
