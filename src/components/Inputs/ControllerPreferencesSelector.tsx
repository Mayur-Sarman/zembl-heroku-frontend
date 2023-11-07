import { ChangeEvent } from 'react'
import { Control, Controller } from 'react-hook-form'
import { ValidationObject } from '../../constants/validation'
import PreferenceSelector, { PreferenceSelectorProps } from './PreferenceSelector'
import { NO_PREFERENCE } from '../../constants'

const ControllerPreferencesSelector = ({ name, control, rules, ...rest }: ControllerPreferencesSelectorProps) => {
  const onPreferenceSelected = (
    event: ChangeEvent<HTMLButtonElement>,
    currentSelections: string[],
    onChange: (event: unknown) => unknown,
  ) => {
    const value = event.target.value
    const prev = currentSelections ?? []
    const isSelected = prev.includes(value)
    let values = []
    if(value === NO_PREFERENCE) {
      values = isSelected ? [] : [value]
    } else {
      values = isSelected ? prev.filter((i) => i != value) : [...prev.filter((i) => i != NO_PREFERENCE), value]
    }
    onChange(values)
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <PreferenceSelector
            {...rest}
            onChange={(e: ChangeEvent<HTMLButtonElement>) =>
              onPreferenceSelected(e, field.value as string[], field.onChange)
            }
            preferences={(field.value as string[]) ?? []}
            title="Preferences"
            error={fieldState.error}
            required={!!rules?.required}
          />
        )
      }}
    />
  )
}

interface ControllerPreferencesSelectorProps extends Partial<PreferenceSelectorProps> {
  control: Control
  name: string
  rules?: Record<string, ValidationObject>
}

export default ControllerPreferencesSelector
