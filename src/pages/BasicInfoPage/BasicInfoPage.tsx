import { lazy } from "react"

const BasicInfoPageTitle = lazy(() => import('./BasicInfoPageTitle'))
const PageWrapper = lazy(() => import('../../components/PageWrapper'))
const BasicInfoPage1 = lazy(() => import('./BasicInfoPage1/BasicInfoPage1'))
const BasicInfoPage2 = lazy(() => import('./BasicInfoPage2/BasicInfoPage2'))

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
