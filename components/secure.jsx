import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FaCheckCircle } from "react-icons/fa";

export default function SecureSection() {
  const t = useTranslations('SecureSection')

  return (
    <section className="">
      <div className="container mx-auto flex">
        <div className="flex flex-col-reverse lg:flex-row bg-[#F8FBFF] rounded-[32px] p-[50px_37px_76px]">
          <div className="flex-1 mt-[30px] lg:mt-0">
            <Image
              src="/images/thumbs/secure-thumb.svg"
              alt="Secure, Compliant, and Connected"
              width={500}
              height={400}
              className="max-w-full"
            />
          </div>
          <div className="flex-1">
            <div className="max-w-[500px]">
              <h2 className="text-secondary mb-4">
                {t('heading')} <span className="text-primary">{t('headingHighlight')}</span>
              </h2>
            </div>
            <ul className="space-y-4 text-lg text-gray-700 border-b border-gray-300 pb-8">
              <li className="flex items-start">
                <FaCheckCircle className='text-primary mr-4 mt-1.5 w-5 flex-shrink-0' />
                <span className='text-[20px] font-semibold text-[#304C61]'>{t('bullet1')}</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className='text-primary mr-4 mt-1.5 w-5 flex-shrink-0' />
                <span className='text-[20px] font-semibold text-[#304C61]'>{t('bullet2')}</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className='text-primary mr-4 mt-1.5 w-5 flex-shrink-0' />
                <span className='text-[20px] font-semibold text-[#304C61]'>{t('bullet3')}</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-8">
              {t('footer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
