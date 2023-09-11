import { Controller, useForm } from 'react-hook-form'

import { Button } from '@material-tailwind/react'
import AccordionCard from '../../../components/AccordionCard'
import RegistrationStep from '../../../components/RegistrationStep'
import { YES_NO_OPTIONS } from '../../../constants'
import RadioGroupInput, { InputOptions } from '../../../components/Inputs/RadioGroupInput'
import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PreferenceSelector from '../../../components/PreferenceSelector'

const SUBSCRIBE_TYPE_OPTIONS: InputOptions[] = [
  { value: 'Email', label: 'Email' },
  { value: 'Post', label: 'Post' },
]

const LIFE_SUPPORT_OPTIONS: InputOptions[] = YES_NO_OPTIONS
const SOLAR_OPTIONS: InputOptions[] = YES_NO_OPTIONS
const SOLAR_CONSIDERATION_OPTIONS: InputOptions[] = YES_NO_OPTIONS

const BasicInfoPage2 = () => {
  const [preferences, setPreferences] = useState<string[]>([])
  // On load page get data from context
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: { preferences: [], subscribeType: '', lifeSupport: '', solar: '', solarConsideration: '' },
  })
  const navigate = useNavigate()

  const onPreferenceSelected = useCallback(
    (event: ChangeEvent<HTMLButtonElement>) => {
      const value = event.target.value
      setPreferences((prev) => {
        const isSelected = prev.includes(value)
        const values = isSelected ? prev.filter((i) => i != value) : [...prev, value]

        setValue('preferences', values as never)
        return values
      })
    },
    [setValue],
  )

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    // Call API
    // Put data to context
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
      <div className="lg:h-32 lg:py-3 lg:px-14 lg:mt-6">
        <div className="hidden lg:block">
          <RegistrationStep currentStep={0} />
        </div>
      </div>
      <hr className="hidden lg:block" />

      <AccordionCard alwaysOpen open title="Bill & Messages">
        <div className="w-full flex flex-col gap-3 text-left">
          <Controller
            control={control}
            name="subscribeType"
            render={({ field }) => (
              <RadioGroupInput
                {...field}
                label="How would you like to receive your bills and other notices, like disconnection warnings and price change notifications?"
                values={[field.value]}
                options={SUBSCRIBE_TYPE_OPTIONS}
              />
            )}
          />
        </div>
      </AccordionCard>

      <AccordionCard alwaysOpen open title="Life Support">
        <div className="w-full flex flex-col gap-3 text-left">
          <Controller
            control={control}
            name="lifeSupport"
            render={({ field }) => (
              <RadioGroupInput
                {...field}
                label="Is there Life Support at the property?"
                values={[field.value]}
                options={LIFE_SUPPORT_OPTIONS}
              />
            )}
          />
        </div>
      </AccordionCard>

      <AccordionCard alwaysOpen open title="Solar">
        <div className="w-full flex flex-col gap-3 text-left">
          <Controller
            control={control}
            name="solar"
            render={({ field }) => (
              <RadioGroupInput
                {...field}
                label="Do you have Solar at the property?"
                values={[field.value]}
                options={SOLAR_OPTIONS}
              />
            )}
          />
          <Controller
            control={control}
            name="solarConsideration"
            render={({ field }) => (
              <RadioGroupInput
                {...field}
                label="Will you be considering solar panels in the next 12 months?"
                values={[field.value]}
                options={SOLAR_CONSIDERATION_OPTIONS}
              />
            )}
          />
        </div>
      </AccordionCard>

      <PreferenceSelector onChange={onPreferenceSelected} preferences={preferences} title="Preferences" />

      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        <Button
          variant="outlined"
          onClick={() => navigate('/basic-info-1')}
          className="text-zembl-p w-full lg:w-1/3 place-self-center"
        >
          Back
        </Button>
        <Button
          type="submit"
          onClick={() => navigate('/bill-upload')}
          className="!zembl-btn w-full lg:w-1/3 place-self-center"
        >
          Next
        </Button>
      </div>
    </form>
  )
}

export default BasicInfoPage2
