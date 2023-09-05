import { PropsWithChildren } from 'react'

const PageWrapper = ({ children, containerClassName, contentWrapperClassName }: PageWrapperProps) => {
  return (
    <div className={`flex flex-col text-center h-full ${containerClassName}`}>
      <div
        className={`flex flex-col items-center gap-6 py-6 px-4 max-w-screen-xl w-full m-auto ${contentWrapperClassName}`}
      >
        {children}
      </div>
    </div>
  )
}

interface PageWrapperProps extends Partial<PropsWithChildren> {
  containerClassName?: string
  contentWrapperClassName?: string
}

export default PageWrapper
