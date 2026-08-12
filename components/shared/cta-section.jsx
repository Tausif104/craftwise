import PrimaryBtn from '@/components/global/primary-btn'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SecoundaryBtn from '../global/secoundary-btn'
import Image from 'next/image'

const CTASection = ({ ctaData, locale }) => {
  const { title, semiTitle, description, primaryBtn, outlineBtn, email, semiDesc, contactLabel } = ctaData || {}
  const containerWidthClass = `${ctaData?.maxWidth || 'max-w-[650px]'} ${locale === 'de' ? 'xl:max-w-fit' : ''}`.trim()
  return (
    <section className=''>
      <div className='container mx-auto px-5 sm:px-6 !py-6 sm:!py-10 md:!py-16 !lg:!pb-32 bg-white shadow-[20px_-20px_100px_rgba(0,0,0,0.2)] rounded-[24px] sm:rounded-[30px]'>
        <div className={`${containerWidthClass} mx-auto text-center`}>
          {/* Heading */}
          <h2 className={`mb-1 text-[22px] sm:text-[28px] md:text-4xl lg:text-[38px] font-bold text-black leading-tight ${ctaData?.headingClass || ''}`}>

            {title?.map((segment, index) => (
              <span
                key={index}
                className={segment.primary ? 'text-primary' : 'text-[#181818]'}
              >
                {segment.text}
              </span>
            ))}
          </h2>

          {/* Subheading */}
          {
            semiTitle && (
              <p className='text-[20px] sm:text-[26px] md:text-[30px] font-semibold text-black mb-3 sm:mb-4 md:mb-5'>
                {semiTitle}
              </p>
            )
          }


          {/* Description */}
          <p className={`text-sm sm:text-base text-[#181818] mb-4 sm:mb-6 md:mb-8 leading-relaxed ${ctaData?.descMaxWidth || 'max-w-[580px]'} mx-auto whitespace-pre-line ${ctaData?.descClass || ''}`}>
            {description}
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center'>
            {/* Primary Button */}
            <SecoundaryBtn text={primaryBtn?.text} link={primaryBtn?.link} />

            {/* Outline Button */}
            {
              outlineBtn && (<Link
                href={outlineBtn?.link}
                className='inline-block text-sm sm:text-base md:text-[16px] font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-[#181818] border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform'
              >
                <div className='flex items-center gap-2'>
                  {outlineBtn.text} <ArrowRight className='inline-block w-5' />
                </div>
              </Link>)
            }
            {
              email && (<div className='inline-flex items-center gap-2.5'>
                <div>
                  <Image src="/images/cta-email.svg" alt="Email Icon" width={57} height={57} className='inline-block' />
                </div>
                <div className='text-left'>
                  <p className='text-[#393E41] text-sm mb-1'>{contactLabel || 'Contact us directly at:'}</p>
                  <Link href={`mailto:${email}`} className='text-[#181818] font-medium hover:text-primary transition-colors'>
                    {email}
                  </Link>
                </div>
              </div>)
            }

          </div>
          {
            semiDesc && <h6 className='text-sm sm:text-base font-semibold mt-5 sm:mt-8'>{semiDesc}</h6>
          }
        </div>
      </div>
    </section>
  )
}

export default CTASection


