import { Typography } from '@material-tailwind/react'
import { ForwardedRef, ReactNode, forwardRef } from 'react'

const links: FooterLink[] = [
  {
    displayText: 'Privacy Policy',
    targetLink: 'https://www.google.com/',
    isExternal: true,
  },
  {
    displayText: 'Terms & Conditions',
    targetLink: 'https://www.google.com/',
    isExternal: true,
  },
  {
    displayText: 'Retailer Network',
    targetLink: 'https://www.google.com/',
    isExternal: true,
  },
]

const Footer = forwardRef(function Footer(_, ref: ForwardedRef<HTMLElement>) {
  const linkDisplay = links.map((item, index) => (
    <span key={index} className={`w-full lg:w-4/12`}>
      <a
        href={item.targetLink}
        target={item.isExternal ? '_blank' : undefined}
        rel={item.isExternal ? 'noreferrer' : undefined}
      >
        <Typography className="text-sm font-medium lg:text-base hover:underline active:underline focus:underline">
          {item.displayText}
        </Typography>
      </a>
    </span>
  ))

  return (
    <footer
      ref={ref}
      className="flex w-full flex-row flex-wrap bg-zembl-p items-center justify-center gap-y-3 lg:gap-y-6 gap-x-12 border-t border-blue-gray-50 p-8 lg:justify-between mt-auto"
    >
      <Typography variant="paragraph" className="text-xs lg:text-base">
        *Zembl Pty Ltd (ABN 29138847757) helps you compare energy and gas plans and providers. Not all plans or
        providers in the market are compared. The availability of plans and providers may change from time to time. Not
        all plans available from the providers are compared. Due to commercial arrangements, area and service
        availability, not all plans compared will be available to all customers. Zembl earn a commission for every plan
        sold through the website. Click here to view Zembl’s range of retail providers.
      </Typography>

      <hr className="w-full my-2 border-blue-gray-50" />

      <div className="flex w-full gap-3 flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-2/5 flex flex-wrap gap-3">
          <div className="w-full lg:w-2/5">
            <Typography className="text-sm lg:text-base font-medium">&copy;Zembl 2023</Typography>
          </div>
          <div className="w-full lg:w-2/5">
            <Typography className="text-sm lg:text-base font-medium">ABN 29138847757</Typography>
          </div>
        </div>
        <hr className="w-full my-2 border-blue-gray-50 lg:hidden" />
        <div className="gap-y-3 flex flex-col lg:w-3/5 lg:flex-row lg:text-right">{linkDisplay}</div>
      </div>
    </footer>
  )
})

interface FooterLink {
  displayText: ReactNode
  targetLink: string
  isExternal: boolean
}

export default Footer
