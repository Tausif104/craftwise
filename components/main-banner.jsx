import React from 'react'


import Image from 'next/image'
import SecoundaryBtn from './global/secoundary-btn'

const MainBanner = ({
  bgImage = '/images/bg/hero-bg.jpg',
  pageName = 'Page',
  title = [],
  semiTitle = '',
  description = '',
  button,
  image = '',
  h1Class = '',

}) => {
  return (
    <section className='relative w-full pt-[100px]  xl:pt-[140px] lg:pb-[106px]'>
      <div
                className="absolute hidden lg:block inset-0 bg-no-repeat bg-bottom bg-cover"
                style={{ backgroundImage: `url('${bgImage}')` }}
            ></div>
            <div
                className="absolute lg:hidden inset-0 bg-no-repeat bg-bottom bg-cover"
                style={{ backgroundImage: `url('/images/pricing/mobile-bg.png')` }}
            ></div>

      <div className='container  relative z-10'>
        <div
          className={`grid grid-cols-1 ${image ? 'lg:grid-cols-2' : 'max-w-4xl'} gap-4 items-center`}
        >
          <div className='max-w-[630px] mx-auto lg:mx-0'>
       
            <h1 className={`text-center lg:text-left text-[36px] md:text-[46px] lg:text-[56px]  font-bold leading-[1.2] lg:mt-6 ${h1Class}`}>
              {title.map((segment, index) => (
                <span
                  key={index}
                  className={
                    segment.primary ? 'text-primary' : 'text-text-secondary'
                  }
                >
                  {segment.text}
                </span>
              ))}
            </h1>

            {semiTitle && (
              <h4 className='text-center lg:text-left text-lg md:text-[26px] mt-4 text-text-secondary  '>
                {semiTitle}
              </h4>
            )}

            {description && (
              <p className='text-center lg:text-left text-lg md:text-xl text-text-secondary pt-4 lg:pt-5 leading-relaxed'>
                <span dangerouslySetInnerHTML={{ __html: description }} />
              </p>
            )}

            {button && (
              <div className='flex justify-center lg:justify-start mt-6 lg:mt-10'>
                <SecoundaryBtn
                  text={button.text}
                  link={button.link}
                  iosLink={button.iosLink}
                  androidLink={button.androidLink}
                />
              </div>
            )}
          </div>

          {image && (
            <div className='flex justify-center lg:justify-end '>
              <div className='relative w-full max-w-[650px] aspect-[4/3]  xl:-mr-10 2xl:-mr-16'>
                <Image
                  src={image}
                  alt={pageName}
                  fill
                  className='object-contain'
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MainBanner
