import { useForm } from 'react-hook-form'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

const ReZemblDetailPage = () => {
  const navigate = useNavigate()

  // On load page get data from context
  const { handleSubmit } = useForm()

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    navigate('/rezembl-terms')
    // Call API
    // Put data to context
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12 items-center">
        <Button type="submit" className="!zembl-btn m-auto w-full lg:w-1/4">
          View and accept terms
        </Button>
      </form>
    </PageWrapper>
  )
}

export default ReZemblDetailPage
