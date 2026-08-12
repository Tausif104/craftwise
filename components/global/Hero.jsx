"use client"
import React, { useRef } from 'react';
import { Link } from '@/i18n/navigation';

import Image from 'next/image';
import SecoundaryBtn from './secoundary-btn';
import { usePathname, useRouter } from 'next/navigation';
import { max } from 'date-fns';
import { normalizeLocalizedHref } from '@/lib/normalize-localized-href';

const Hero = ({
    bgImage = '/images/bg/hero-bg.jpg',
    pageName = 'Page',
    title = [],
    semiTitle = '',
    description = '',
    button = null,
    image = '',
    slug = '',
    slugLink = '',
    mr='',
    maxW='',
    descJson = false,
    descriptionTwo='',
    maxDesTwo='',
    maxDes = '',
h1 = '',
    imgMr = '',
    semiTitleClass = '',
    descClass = '',

}) => {
    const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

     
    return (
        <section
            className="relative w-full pt-[100px] md:pt-[112px] xl:pt-[180px] pb-[60px] md:pb-[80px] xl:pb-[106px] overflow-x-hidden"
        >

            <div
                className="absolute hidden lg:block inset-0 bg-no-repeat bg-bottom bg-cover"
                style={{ backgroundImage: `url('${bgImage}')` }}
            ></div>
            <div
                className="absolute lg:hidden inset-0 bg-no-repeat bg-bottom bg-cover"
                style={{ backgroundImage: `url('/images/bg/mobile-bg.png')` }}
            ></div>

            <div className="container relative z-10 px-4 lg:px-6">
                <div className={`grid grid-cols-1 ${image ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto'} gap-8 lg:gap-4 items-center`}>

                    <div className={`${mr ?? ""} ${maxW ?? "lg:max-w-[662px]"} ${image ? 'text-center lg:text-start' : 'text-center mx-auto'}`}>
                        {
                            slug && <div className={`flex items-center gap-1 font-medium text-sm lg:text-[16px] ${image ? 'justify-center lg:justify-start' : 'justify-center'}`}>
                            <Link href={normalizeLocalizedHref(slugLink || "/")} className="text-primary cursor-pointer hover:text-primary/80 hover:underline transition-all">
                                {slug || "Home"}
                            </Link>
                            <span className="text-[#393E41]">-</span>
                            <span className="text-[#393E41]">{pageName}</span>
                        </div>
                        }
                        <h1 className={`text-[30px] md:text-[46px] lg:text-[56px] font-bold leading-[1.2] mt-4 xl:mt-6 text-center lg:text-start ${h1 || ''}`}>
                            {title.map((segment, index) => (
                                <React.Fragment key={index}>
                                    {segment.newLine && <br />}
                                    <span
                                        className={segment.primary ? 'text-primary' : 'text-text-secondary'}
                                    >
                                        {segment.text}
                                    </span>
                                </React.Fragment>
                            ))}
                        </h1>

                        {semiTitle && (
                            <h4 className={`text-[18px] text-center lg:text-start mt-4 text-text-secondary ${semiTitleClass || 'lg:text-[26px]'}`}>
                                {semiTitle}
                            </h4>
                        )}

                        {description &&  (
  descJson ? (
    <>
    <p
      className={`text-center lg:text-start text-text-secondary pt-4 lg:pt-5 leading-relaxed ${descClass || 'text-base lg:text-xl'} ${maxDes ? maxDes : ""}`}
      dangerouslySetInnerHTML={{ __html: description }}
    />
    {
        descriptionTwo &&  <p
      className={`text-base text-center lg:text-start lg:text-xl text-text-secondary pt-4 lg:pt-5 leading-relaxed ${maxDesTwo ? maxDesTwo : ""}`}
      dangerouslySetInnerHTML={{ __html: descriptionTwo }}
    />
    }
    </>
  ) : (
    <>
    <p className="text-base text-center lg:text-start lg:text-xl text-text-secondary pt-4 lg:pt-5 leading-relaxed">
      {description}
    </p>
    {
        descriptionTwo &&  <p className="text-base text-center lg:text-start lg:text-xl text-text-secondary pt-4 lg:pt-5 leading-relaxed">
      {descriptionTwo}
    </p>
    }
    </>
    
  )
)}

                        {button && (
                            <div className={`flex mt-6 lg:mt-10 ${image ? 'justify-center lg:justify-start' : 'justify-center'}`}>
                                <SecoundaryBtn text={button.text} link={button.link} scrollToSection={scrollToSection} />
                            </div>
                        )}
                    </div>


                    {image && (
                        <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
                            <div className={`relative w-full max-w-[500px] lg:max-w-[600px] xl:max-w-[650px] aspect-[4/3] mx-auto lg:mx-0 ${imgMr || '2xl:-mr-16'}`}>
                                <Image
                                    src={image}
                                    alt={pageName}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
