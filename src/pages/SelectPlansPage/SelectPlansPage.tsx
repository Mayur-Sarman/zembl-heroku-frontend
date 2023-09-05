import { ChangeEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Accordion, Button } from '@material-tailwind/react'

import RegistrationStep from '../../components/RegistrationStep'
import PageWrapper from '../../components/PageWrapper'
import PreferenceSelector from '../../components/PreferenceSelector'
import SelectPlansPageTitle from './SelectPlansPageTitle'
import { BOTH_VALUE } from '../../constants'
import PlanCard from '../../components/PlanCard'

const SelectPlansPage = () => {
  const [preferences, setPreferences] = useState<string[]>([])

  // On load page get data from context
  const { handleSubmit, setValue } = useForm({
    defaultValues: { preferences: [] },
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
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <div className="lg:h-32 lg:py-3 lg:px-14 lg:mt-6">
          <div className="hidden lg:block">
            <RegistrationStep currentStep={1} />
          </div>
        </div>
        <hr className="hidden lg:block" />

        <PreferenceSelector preferences={preferences} onChange={onPreferenceSelected} editable label="" />
        <SelectPlansPageTitle energyType={BOTH_VALUE} />

        <Accordion className="flex flex-col gap-6" open>
          <PlanCard planId="test" onPlanChoose={(value) => console.log(value)} />
          <PlanCard planId="test" onPlanChoose={(value) => console.log(value)} />
          <PlanCard planId="test" onPlanChoose={(value) => console.log(value)} />
          <PlanCard planId="test" onPlanChoose={(value) => console.log(value)} />
        </Accordion>

        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <Button
            variant="outlined"
            onClick={() => navigate('/bill-upload')}
            className="text-zembl-p w-full lg:w-1/3 place-self-center"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="bg-zembl-action-primary text-zembl-p w-full lg:w-1/3 place-self-center"
          >
            Next
          </Button>
        </div>
      </form>
    </PageWrapper>
  )
}

export default SelectPlansPage
