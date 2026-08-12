import Image from 'next/image'

const OnePlatformSection = ({
  heading1,
  headingHighlight,
  subtext,
  officeTitle,
  officeBullets = [],
  siteTitle,
  siteBullets = [],
}) => {
  return (
    <section className='sec-padding-bottom'>
      <div className='container px-6 mx-auto'>
        {/* section title */}
        <div className='text-center max-w-5xl mx-auto mb-12'>
          <h2 className='mb-5'>
            {heading1}<span className='text-primary'>{headingHighlight}</span>
          </h2>
          <p className='text-gray leading-7'>{subtext}</p>
        </div>

        {/* cards */}
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
          {/* Office card */}
          <div className='bg-white p-7.5 shadow-[0px_0px_18px_rgba(0,0,0,0.08)] rounded-3xl transition-transform duration-300 hover:-translate-y-2'>
            <div className='flex gap-7.5 items-center border-b border-[#C9D6F3] md:pb-7.5 md:mb-7.5 pb-3 mb-3'>
              <Image
                src='/icons/job-icon-1.svg'
                width={120}
                height={120}
                alt={officeTitle}
                className='max-w-20'
              />
              <h3 className='font-semibold lg:text-[30px] text-[18px] text-text-secondary'>
                {officeTitle}
              </h3>
            </div>
            <ul className='list-disc pl-5 space-y-3'>
              {officeBullets.map((item, i) => (
                <li key={i} className='lg:text-[22px] text-[16px] text-text-secondary'>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Job-site card */}
          <div className='bg-white p-7.5 shadow-[0px_0px_18px_rgba(0,0,0,0.08)] rounded-3xl transition-transform duration-300 hover:-translate-y-2'>
            <div className='flex gap-7.5 items-center border-b border-[#C9D6F3] md:pb-7.5 md:mb-7.5 pb-3 mb-3'>
              <Image
                src='/icons/job-icon-2.svg'
                width={120}
                height={120}
                alt={siteTitle}
                className='max-w-20'
              />
              <h3 className='font-semibold lg:text-[30px] text-[18px] text-text-secondary'>
                {siteTitle}
              </h3>
            </div>
            <ul className='list-disc pl-5 space-y-3'>
              {siteBullets.map((item, i) => (
                <li key={i} className='lg:text-[22px] text-[16px] text-text-secondary'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OnePlatformSection
