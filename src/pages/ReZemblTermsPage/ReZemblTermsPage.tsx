import { useForm } from 'react-hook-form'
import ReZemblTermForm from '../../components/Forms/ReZemblTermForm'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'
import PageNavigationActions from '../../components/PageNavigationActions'
import { Typography } from '@material-tailwind/react'

const MOCKUP_HTML = `
<p><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b> Sed condimentum pretium maximus. Maecenas vulputate sollicitudin sem, in sollicitudin ante laoreet eu. Vivamus quis ante laoreet, vestibulum nisi quis, ornare libero. Ut semper neque vel lectus venenatis, a pellentesque nisl imperdiet. Etiam luctus elementum quam vitae dictum. Etiam convallis dapibus felis, sed tempus velit blandit non. Morbi ornare nunc accumsan est mollis aliquet. Quisque sodales scelerisque lectus eu sagittis. Suspendisse blandit ante quis quam iaculis, in porta quam egestas. Nulla in suscipit est. Curabitur id tempor neque. Cras non mauris ultricies, posuere purus vel, aliquet ex. Duis molestie lacus ut arcu auctor aliquam ut nec eros.</p>
<p><i>Nullam porta sem ac magna convallis condimentum. Ut eu augue nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</i> Nulla mattis risus sed sodales feugiat. Aliquam eu lorem venenatis, dignissim est nec, molestie risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi non malesuada metus. Nam porttitor a ante nec mattis. Aenean id felis in erat tempor volutpat.</p>
<p>Morbi nunc mi, porta ut est ac, suscipit tempor mauris. <pre>Nullam sed blandit neque, vitae scelerisque mi. Ut ut consectetur libero.</pre> Sed vel leo pellentesque, tempus tortor eu, semper arcu. Nullam elementum sit amet justo sit amet pharetra. Nulla eu sem sem. Aliquam et vulputate lacus, id ultricies libero. Maecenas ullamcorper convallis erat, eleifend tristique justo aliquam sed.</p>
<p><span style='color: red; font-size: 18px; font-weight: 700'>Integer eleifend pretium tristique.</span> Aenean euismod, ex quis commodo tempus, arcu tellus convallis ipsum, nec malesuada enim risus vulputate est. Praesent faucibus dignissim tellus et maximus. Vivamus viverra, velit quis maximus congue, neque lacus venenatis orci, vitae tristique lectus nisl vitae arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In ut risus venenatis, euismod nisl sit amet, dictum risus. Maecenas nisl urna, commodo rhoncus porttitor eget, tincidunt sed mauris. Quisque quis dui pharetra, convallis elit sit amet, faucibus leo. Ut convallis sit amet elit imperdiet bibendum. Vestibulum nec turpis est. Praesent in leo vitae purus vulputate ornare ac eget neque. Etiam in sodales risus, et fringilla purus. Donec condimentum a turpis sit amet porttitor.</p>`

const ReZemblTermsPage = () => {
  const navigate = useNavigate()

  // On load page get data from context
  const { handleSubmit, register } = useForm()

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    navigate('/rezembl-thank-you')
    // Call API
    // Put data to context
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <ReZemblTermForm register={register} zemblTerms={MOCKUP_HTML} />
        <PageNavigationActions hidePrev nextLabel="Submit application" />
        <Typography className="text-xs text-zembl-p">
          Note: By submitting this application, you acknowledge that you have read and agree to the terms and conditions
          of this offer.
        </Typography>
      </form>
    </PageWrapper>
  )
}

export default ReZemblTermsPage
