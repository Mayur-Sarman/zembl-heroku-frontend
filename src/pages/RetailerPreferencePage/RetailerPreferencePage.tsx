import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import { useForm } from 'react-hook-form'
import RegistrationStep from '../../components/RegistrationStep'
import PageNavigationActions from '../../components/PageNavigationActions'
import BasicPreference from '../../components/Preferences/BasicPreference'
import AGLPreference from '../../components/Preferences/AGLPreference'
import BlueNRGPreference from '../../components/Preferences/BlueNRGPreference'
import SimplyEnergyPreference from '../../components/Preferences/SimplyEnergyPreference'
import EnergyAUPreference from '../../components/Preferences/EnergyAUPreference'
import EnergyLocalsPreference from '../../components/Preferences/EnergyLocalsPreference'
import MomentumEnergyPreference from '../../components/Preferences/MomentumEnergyPreference'
import NextBusinessEnergyPreference from '../../components/Preferences/NextBusinessEnergyPreference'

const RetailerPreferencePage = () => {
  const { handleSubmit, control, register, setValue } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data: Record<string, string>) => {
    console.log(data)
    navigate('/review-terms')
  }
  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <RegistrationStep currentStep={3} />
        <hr className="hidden lg:block" />

        <BasicPreference control={control} />
        <AGLPreference control={control} register={register} setValue={setValue} />
        <BlueNRGPreference control={control} />
        <SimplyEnergyPreference />
        <EnergyAUPreference siteAddress="asdfsadfkajsdf" register={register} control={control} setValue={setValue} />
        <EnergyLocalsPreference control={control} />
        <MomentumEnergyPreference control={control} />
        <NextBusinessEnergyPreference control={control} setValue={setValue} register={register} />

        <PageNavigationActions prevLink="/review-plan" />
      </form>
    </PageWrapper>
  )
}

export default RetailerPreferencePage
