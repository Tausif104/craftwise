import BorderBtn from '@/components/global/border-btn'
import PageLayout from '@/components/global/page-layout'
import SecoundaryBtn from '@/components/global/secoundary-btn'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import NotFoundTitle from './_components/not-found-title'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'NotFound' })
  return {
    title: {
      absolute: t('metaTitle'),
    },
  }
}

const NotFound = async () => {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'NotFound' })

  const links = [
    { key: 'linkHome', href: '/' },
    { key: 'linkFeatures', href: '/features' },
    { key: 'linkIndustry', href: '/industry' },
    { key: 'linkContact', href: '/contact' },
  ]

  return (
    <PageLayout locale={locale}>
      <NotFoundTitle title={t('metaTitle')} />
      <section className="pt-[200px]">
        <div className="container mx-auto px-6">
          <div className="bg-[#F8FBFF] p-[40px] xl:p-[100px_200px_70px] text-center rounded-[20px]">
            <Image
              src="/images/404.svg"
              alt="404"
              width={290}
              height={290}
              className="mx-auto mb-[40px]"
            />
            <h1 className="text-[36px] md:text-[42px] xl:text-[56px] text-[#0A1B28] font-bold mb-4">
              {t('h1')}
            </h1>
            <p className="text-[#393E41] whitespace-pre-line">{t('body')}</p>
            <ul className="flex items-center justify-center gap-2 text-[#007AFF] underline flex-wrap py-2">
              {links.map(({ key, href }, i) => (
                <li key={key} className={i > 0 ? 'list-item-dot' : ''}>
                  <Link href={href}>{t(key)}</Link>
                </li>
              ))}
            </ul>
            <p className="text-[#393E41]">{t('smallText')}</p>
            <div className="flex flex-col md:flex-row gap-5 justify-center mt-[50px]">
              <SecoundaryBtn text={t('primaryCta')} link="/registration" />
              <BorderBtn text={t('secondaryCta')} link="/book-demo" className="justify-center" />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default NotFound
