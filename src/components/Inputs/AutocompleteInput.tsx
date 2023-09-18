import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { SelectOption } from '../../constants'
import { Button, Input, Spinner, Typography } from '@material-tailwind/react'
import { Control, Controller } from 'react-hook-form'

const AutocompleteInput = ({
  name,
  control,
  required,
  isLoading,
  containerClassName,
  inputClassName,
  textLabel,
  options,
}: AutocompleteInputProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [filterValue, setFilterValue] = useState<string | null>(null)

  const onTyped: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setFilterValue(value)
  }

  const openDropdown: FocusEventHandler<HTMLInputElement> = () => {
    setDropdownOpen(true)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

  const onInputSelectionBlur = useCallback((e: Event) => {
    const target = e.target as HTMLElement
    if (!target.className.includes('g_pdi') && !target.className.includes('g_ai')) {
      closeDropdown()
    }
  }, [])

  const textLabelDisplay = textLabel ? (
    <Typography variant="small" className="mb-2 pl-1">
      {textLabel}
    </Typography>
  ) : null

  const filteredOptions = useMemo(
    () => (filterValue ? options.filter((item) => `${item.label}`.includes(filterValue)) : options),
    [options, filterValue],
  )

  useEffect(() => {
    addEventListener('click', onInputSelectionBlur)
    return () => {
      removeEventListener('click', onInputSelectionBlur)
    }
  }, [onInputSelectionBlur])

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => {
        const optionList = filteredOptions?.length
          ? filteredOptions.map((item) => (
              <OptionItem key={item.value} {...item} onSelect={() => field.onChange(item)} />
            ))
          : null
        const optionsDisplay = isLoading ? <Spinner className="text-zembl-p" /> : optionList

        return (
          <div className={`w-full text-left ${containerClassName ?? ''}`}>
            {textLabelDisplay}
            <div className="relative">
              <Input
                {...field}
                onChange={onTyped}
                onFocus={openDropdown}
                className={`g_ai !border !border-blue-gray-200 focus:!border-gray-900 bg-white ${inputClassName}`}
                labelProps={{ className: 'hidden' }}
                crossOrigin=""
              />
              <ul
                className={`absolute z-[1] shadow bg-white !border mt-[1px] w-full rounded-lg overflow-hidden ${
                  dropdownOpen ? '' : 'hidden'
                }`}
              >
                {optionsDisplay}
              </ul>
            </div>
          </div>
        )
      }}
    />
  )
}

const OptionItem = ({ onSelect, value, label }: OptionItemProps) => {
  return (
    <li key={value} className="g_pdi w-full">
      <Button
        className="g_li w-full rounded-none text-left normal-case text-zembl-p"
        variant="text"
        value={value}
        onClick={onSelect}
      >
        {label}
      </Button>
    </li>
  )
}

interface AutocompleteInputProps {
  name: string
  control: Control
  required?: boolean
  isLoading?: boolean
  containerClassName?: string
  inputClassName?: string
  textLabel?: string
  options: AutocompleteInputOption[]
}

interface AutocompleteInputOption extends Record<string, unknown>, SelectOption {
  id?: string | number | boolean
}

interface OptionItemProps {
  onSelect: MouseEventHandler<HTMLButtonElement> | undefined
  value: string
  label: string
}

export default AutocompleteInput
