import BasicInfoPageTitle from './BasicInfoPageTitle'
import PageWrapper from '../../components/PageWrapper'
import BasicInfoPage1 from './BasicInfoPage1/BasicInfoPage1'
import BasicInfoPage2 from './BasicInfoPage2/BasicInfoPage2'

const BasicInfoPage = ({ pageNo }: { pageNo: number }) => {
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

  return (
    <PageWrapper>
      {header}
      {content}
    </PageWrapper>
  )
}

export default BasicInfoPage
