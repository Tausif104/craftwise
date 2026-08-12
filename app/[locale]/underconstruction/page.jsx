import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import PageLayout from '@/components/global/page-layout'
import Countdown from './_components/countdown'
import Image from 'next/image'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'UnderConstruction' })
  return {
    title: t('title'),
  }
}

const UnderConstruction = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'UnderConstruction' })

  const targetDate = "2026-05-01T00:00:00"

  return (
    <PageLayout pageKey="/underconstruction" locale={locale}>
      <section className='pt-[200px]'>
        <div className="container mx-auto px-6">
          <div className='bg-[#F8FBFF] p-[40px] xl:p-[100px_200px_70px] text-center rounded-[20px]'>
            <Image src="/images/under-construction.svg" alt="Under Construction" width={700} height={450} className='mx-auto mb-[40px]' />
            <h1 className='text-[36px] md:text-[42px] xl:text-[56px] text-[#0A1B28] font-bold mb-4'>{t('title')}</h1>
            <p className='text-[#393E41] mb-8'>{t('description')}</p>

            <Countdown
              targetDate={targetDate}
              labelDays={t('labelDays')}
              labelHours={t('labelHours')}
              labelMinutes={t('labelMinutes')}
            />

            <div className='mt-8'>
              <ul className='flex flex-col items-start md:justify-center gap-2 text-[#007AFF] underline md:flex-row py-2 pl-6 max-md:list-disc marker:text-primary'>
                <li><Link href="/">{t('linkHome')}</Link></li>
                <li className="list-item-dot"><Link href="/contact">{t('linkContact')}</Link></li>
                <li className="list-item-dot"><Link href="/news">{t('linkNews')}</Link></li>
                <li className="list-item-dot"><Link href="/faq">{t('linkFaq')}</Link></li>
              </ul>
              <p className='text-[#393E41] max-w-xl mx-auto'>{t('bottomText')}</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default UnderConstruction
