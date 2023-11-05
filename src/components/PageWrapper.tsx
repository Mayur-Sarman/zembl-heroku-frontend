import { Spinner } from '@material-tailwind/react'
import { PropsWithChildren } from 'react'
import { useRegistration } from '../hooks/useRegistration'

const PageWrapper = ({ children, containerClassName, contentWrapperClassName, showLoading }: PageWrapperProps) => {
  const { isLoading, uploadText } = useRegistration()
  const backdrop = !!showLoading || isLoading || !!uploadText ? (
    <div className="w-full h-full absolute z-50 top-0 left-0 backdrop-blur-sm flex items-center justify-center">
      <Spinner className="h-16 w-16 m-auto absolute opacity-100" />
      <div className="mt-28"><p className="text-black">{uploadText ?? 'Please Wait'}</p></div>
    </div>
  ) : null
  return (
    <>
      {backdrop}
      <div className={`flex flex-col text-center h-full relative w-full ${containerClassName}`}>
        <div
          className={`flex flex-col items-center gap-6 py-6 px-4 max-w-screen-xl w-full m-auto ${contentWrapperClassName}`}
        >
          {children}
        </div>
      </div>
    </>
  )
}

interface PageWrapperProps extends Partial<PropsWithChildren> {
  containerClassName?: string
  contentWrapperClassName?: string
  showLoading?: boolean
}

export default PageWrapper
