"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import Image from 'next/image'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'
import CTASection from '../shared/cta-section'

const Footer = ({ ctaData, ctaDesktopOnly = false }) => {
  const t = useTranslations('Footer')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [isLangOpen, setIsLangOpen] = useState(false)

  const languages = ['en', 'de']
  const routeParams = Object.fromEntries(
    Object.entries(params).filter(([key]) => key !== 'locale')
  )
  const currentRoute = Object.keys(routeParams).length
    ? { pathname, params: routeParams }
    : pathname

  const handleLangChange = (lang) => {
    router.replace(currentRoute, { locale: lang })
    setIsLangOpen(false)
  };

  return (
    <footer className="mt-15">
      <div className={`${ctaData ? (ctaDesktopOnly ? "hidden lg:block lg:-mb-100 mx-6 2xl:mx-0" : "-mb-100 mx-6 2xl:mx-0") : ""} relative`}>
        {ctaData && <CTASection ctaData={ctaData} locale={locale} />}
      </div>
      <div className={`bg-[url("/images/bg/footer-sm-bg.svg")] md:bg-[url("/images/bg/footer-bg.png")] bg-cover max-md:bg-center bg-top-center ${ctaData ? (ctaDesktopOnly ? "pt-24 sm:pt-32 md:pt-60 lg:pt-120" : "pt-120") : "pt-24 sm:pt-32 md:pt-60 lg:pt-80"}`}>
        {/* main footer */}
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-2 lg:grid-cols-12 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-8 sm:gap-y-10'>
            <div className='col-span-2 lg:col-span-4 lg:pr-10'>
              <Image
                src='/main-logo.svg'
                width={200}
                height={64}
                alt='Logo'
                className='w-[160px] sm:w-[180px] lg:w-[200px] h-auto'
              />
              <p className='text-white/80 mt-3 sm:mt-4 leading-7 text-sm md:text-base max-w-md'>
                {t('brandText')}
              </p>
            </div>

            <div className='col-span-1 lg:col-span-2'>
              <h4 className='text-white font-semibold text-base md:text-lg lg:text-[20px] mb-4 sm:mb-5'>
                {t('quickLinksTitle')}
              </h4>
              <ul className='space-y-2.5 sm:space-y-3'>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/'>
                    {t('quickLinkHome')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/features'>
                    {t('quickLinkFeatures')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/industry'>
                    {t('quickLinkIndustry')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/pricing'>
                    {t('quickLinkPricing')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/consulting'>
                    {t('quickLinkConsulting')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/mobile-app'>
                    {t('quickLinkMobileApp')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className='col-span-1 lg:col-span-2'>
              <h4 className='text-white font-semibold text-base md:text-lg lg:text-[20px] mb-4 sm:mb-5'>
                {t('companyTitle')}
              </h4>
              <ul className='space-y-2.5 sm:space-y-3'>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/about-us'>
                    {t('companyAbout')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/news'>
                    {t('companyNews')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/legal-notice'>
                    {t('companyLegalNotice')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className='col-span-2 lg:col-span-4'>
              <h4 className='text-white font-semibold text-base md:text-lg lg:text-[20px] mb-4 sm:mb-5'>
                {t('supportTitle')}
              </h4>
              <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2.5 sm:gap-y-3'>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/contact'>
                    {t('supportContact')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/privacy-policy'>
                    {t('supportPrivacy')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/terms-conditions'>
                    {t('supportTerms')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/book-demo'>
                    {t('supportBookDemo')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/data-processing'>
                    {t('supportDataProcessing')}
                  </Link>
                </li>
                <li>
                  <Link className='text-white/80 text-sm md:text-base hover:text-primary transition-colors' href='/faq'>
                    {t('supportFaq')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* copyright */}
        <div>
          <div className='container mx-auto px-4 sm:px-6 border-t border-t-[#fdfeff18] !pb-[30px] sm:!pb-[40px] !pt-[20px] !mt-[30px] sm:!mt-[40px]'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-5 md:gap-4'>
              <p className='text-white text-sm md:text-base text-center md:text-left order-2 md:order-1'>
                {t('copyright')}
              </p>
              <div className='order-1 md:order-2'>
                <ul className='flex flex-wrap justify-center gap-2.5 sm:gap-3 items-center'>
                  <li>
                    <a aria-label='LinkedIn' className='bg-[#ffffff19] flex w-9 h-9 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] items-center justify-center rounded-full text-white text-base sm:text-lg md:text-[20px] transition duration-300 hover:bg-primary' href='#'>
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li>
                    <a aria-label='YouTube' className='bg-[#ffffff19] flex w-9 h-9 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] items-center justify-center rounded-full text-white text-base sm:text-lg md:text-[20px] transition duration-300 hover:bg-primary' href='#'>
                      <FaYoutube />
                    </a>
                  </li>
                  <li>
                    <a aria-label='Facebook' className='bg-[#ffffff19] flex w-9 h-9 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] items-center justify-center rounded-full text-white text-base sm:text-lg md:text-[20px] transition duration-300 hover:bg-primary' href='#'>
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a aria-label='Instagram' className='bg-[#ffffff19] flex w-9 h-9 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] items-center justify-center rounded-full text-white text-base sm:text-lg md:text-[20px] transition duration-300 hover:bg-primary' href='#'>
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <div className="relative ml-1 sm:ml-3">
                      <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 text-white text-sm md:text-base"
                      >
                        <span className="uppercase">{locale}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isLangOpen && (
                        <div className="absolute right-0 bottom-full mb-2 bg-white shadow-xl p-3 flex flex-col gap-3 rounded">
                          {languages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => handleLangChange(lang)}
                              className={`w-9 h-9 overflow-hidden transition uppercase hover:text-primary ${locale === lang ? "font-bold text-primary" : ""}`}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
