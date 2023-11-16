import contactIcon from '../assets/contact.svg'

const ContactUs = () => {
  return (
    <div className="flex align-top">
      <img loading="lazy" src={contactIcon} width={50} height={48} alt="Contact" className='h-8 md:h-auto'></img>
      <div className="ml-4 md:ml-3">
        <div className="text-xs sm:text-sm md:text-base">
          <span className="inline-block font-bold mr-1">1300 957 721 |</span>
          <span className="inline-block">
            <button className='underline'>
              hello@zembl.com.au
            </button>
          </span>
        </div>
        <div className="text-xs sm:text-sm md:text-base">
          <span className="inline-block mr-1">Mon-Thur 9am-5pm,</span>
          <span className="inline-block">Fri 9am-4pm Sydney</span>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
