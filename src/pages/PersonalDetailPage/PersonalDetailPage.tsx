import PersonalDetailPage1 from './PersonalDetailPage1/PersonalDetailPage1'
import PersonalDetailPage2 from './PersonalDetailPage2/PersonalDetailPage2'
import PersonalDetailPage3 from './PersonalDetailPage3/PersonalDetailPage3'
import PageWrapper from '../../components/PageWrapper'
import RegistrationStep from '../../components/RegistrationStep'

const PersonalDetailPage = ({ pageNo }: { pageNo: number }) => {
  let content = null

  switch (pageNo) {
    case 1:
      content = <PersonalDetailPage1 />
      break
    case 2:
      content = <PersonalDetailPage2 />
      break
    case 3:
      content = <PersonalDetailPage3 />
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 w-full md:w-10/12">
        <RegistrationStep currentStep={2} />
        <hr className="hidden lg:block" />
        {content}
      </div>
    </PageWrapper>
  )
}

export default PersonalDetailPage
