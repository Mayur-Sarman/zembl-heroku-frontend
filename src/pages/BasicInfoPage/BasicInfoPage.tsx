import { useEffect } from 'react'
import { useModal, useToast } from '../../hooks'
import BasicInfoPageTitle from './BasicInfoPageTitle'
import BasicInfoPage1 from './BasicInfoPage1/BasicInfoPage1'
import BasicInfoPage2 from './BasicInfoPage2/BasicInfoPage2'
import PageWrapper from '../../components/PageWrapper'

const BasicInfoPage = ({ pageNo }: { pageNo: number }) => {
  const { fireAlert } = useToast()
  const { openModal } = useModal()

  let header = null
  let content = null

  switch (pageNo) {
    case 1:
      header = <BasicInfoPageTitle />
      content = <BasicInfoPage1 />
      break
    case 2:
      content = <BasicInfoPage2 />
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
      {header}
      {content}
    </PageWrapper>
  )
}

export default BasicInfoPage
