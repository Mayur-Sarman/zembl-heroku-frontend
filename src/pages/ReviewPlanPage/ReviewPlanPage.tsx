import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import { useForm } from 'react-hook-form'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useContext } from 'react'
import { Typography } from '@material-tailwind/react'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../../constants'
import PlanSummaryCard from '../../components/PlanSummaryCard'
import AccountDetailsForm from '../../components/Forms/PersonalDetails/AccountDetailsForm'
import BusinessDetailsForm from '../../components/Forms/PersonalDetails/BusinessDetailsForm'
import PageNavigationActions from '../../components/PageNavigationActions'
import ControllerCheckBox from '../../components/Inputs/ControllerCheckBox'

const ReviewPlanPage = () => {
  const { registrationData } = useContext(RegistrationContext)
  const navigate = useNavigate()

  // On load page get data from context
  const { handleSubmit, control } = useForm()

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    navigate('/preferences')
    // Call API
    // Put data to context
  }

  const electricityPlanSummary =
    registrationData.energyType !== GAS_VALUE ? (
      <PlanSummaryCard
        planId="test"
        planType={ELECTRICITY_VALUE}
        planBrand="Big Boss Electicity"
        planLogoURL="/vite.svg"
        planBenefits={['No Exit Fees', '100% Australian Owned']}
        planDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend sagittis tortor nec fermentum. Pellentesque id nulla vel dui pretium aliquam. Fusce auctor varius orci, eu rhoncus lorem. Suspendisse sollicitudin metus sed est vulputate, vitae commodo elit dapibus. Vivamus eleifend neque quam. Duis vel condimentum orci. Maecenas quis aliquet turpis. Proin feugiat magna mi, nec pharetra eros imperdiet sed. Ut eleifend dictum quam ac auctor. Morbi convallis tempus arcu, ac rutrum ligula."
        planEstAnnualSaving={0.5}
        planLessThanCurrentPricePercent={0.25}
        planEstCostPerMonth={500}
        planEstCostPerYear={469}
        fullAddress="5/100 William Street, Woolloomooloo NSW 2011"
        gasOrEnergyCode="41234512834"
      />
    ) : null

  const gasPlanSummary =
    registrationData.energyType !== ELECTRICITY_VALUE ? (
      <PlanSummaryCard
        planId="test"
        planType={GAS_VALUE}
        planBrand="Big Boss Electicity"
        planLogoURL="/vite.svg"
        planBenefits={['No Exit Fees', '100% Australian Owned']}
        planDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend sagittis tortor nec fermentum. Pellentesque id nulla vel dui pretium aliquam. Fusce auctor varius orci, eu rhoncus lorem. Suspendisse sollicitudin metus sed est vulputate, vitae commodo elit dapibus. Vivamus eleifend neque quam. Duis vel condimentum orci. Maecenas quis aliquet turpis. Proin feugiat magna mi, nec pharetra eros imperdiet sed. Ut eleifend dictum quam ac auctor. Morbi convallis tempus arcu, ac rutrum ligula."
        planEstAnnualSaving={0.5}
        planLessThanCurrentPricePercent={0.25}
        planEstCostPerMonth={500}
        planEstCostPerYear={469}
        fullAddress="5/100 William Street, Woolloomooloo NSW 2011"
        gasOrEnergyCode="41234512834"
      />
    ) : null

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12 items-center">
        <Typography variant="h1" className="text-center text-zembl-p text-3xl lg:text-5xl">
          Energy Plan Confirmation
        </Typography>
        <Typography className="text-center text-base font-normal text-zembl-p">
          Please check your plans and contact details are correct
        </Typography>
        {electricityPlanSummary}
        {gasPlanSummary}
        <AccountDetailsForm control={control} readOnly />
        <BusinessDetailsForm control={control} readOnly compactForm />
        <ControllerCheckBox
          label="I have checked this is my correct personal and or business information"
          control={control}
          name="confirm"
          required
        />
        <PageNavigationActions nextLabel="Continue" hidePrev containerClass="w-full" />
      </form>
    </PageWrapper>
  )
}

export default ReviewPlanPage
