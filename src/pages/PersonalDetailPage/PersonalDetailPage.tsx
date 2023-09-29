import { useEffect } from 'react'
import { useModal, useToast } from '../../hooks'
import PersonalDetailPage1 from './PersonalDetailPage1/PersonalDetailPage1'
import PersonalDetailPage2 from './PersonalDetailPage2/PersonalDetailPage2'
import PageWrapper from '../../components/PageWrapper'
import RegistrationStep from '../../components/RegistrationStep'

const PersonalDetailPage = ({ pageNo }: { pageNo: number }) => {
  const { fireAlert } = useToast()
  const { openModal } = useModal()

  let content = null

  switch (pageNo) {
    case 1:
      content = <PersonalDetailPage1 />
      break
    case 2:
      content = <PersonalDetailPage2 />
      break
  }

  useEffect(() => {
    // fireAlert({ children: <Typography>Test</Typography>, type: 'error' })
    // fireAlert({ children: <Typography>TestTEasdfasdf</Typography>, type: 'error', icon: <ExclamationCircleIcon width={25} height={25} /> })
    // openModal({ open: true, content: <Typography>Test</Typography>, dismissible: true })
    // throw new Error("Test");
  }, [fireAlert, openModal])

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
