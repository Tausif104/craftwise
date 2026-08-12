'use client'

import { smartFeatures } from '@/data/smartFeature'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import Link from 'next/link'

export default function SmartFeaturesSection() {
  const t = useTranslations('SmartFeatures')
  const locale = useLocale()

  const cards = smartFeatures.map((item, i) => ({
    ...item,
    image:
      locale === 'de' && item.id === 1
        ? '/images/german/smart-feature-1-german.png'
        : item.image,
    title: t(`card${item.id}Title`),
    description: t(`card${item.id}Text`),
  }))

  return (
    <section className='sec-padding-top sec-padding-bottom bg-white '>
      <div className='container mx-auto px-6'>
        <div className='text-center max-w-4xl mx-auto mb-12'>
          <h2 className='mb-[20px]'>
            {t('headingPart1')}
            <span className='text-primary'>{t('headingHighlight')}</span>
            {t('headingPart2')}
          </h2>
          <p className='mt-4 text-gray-600'>{t('subheading')}</p>
        </div>

        {/* Mobile + Tablet: Swiper */}
        <div className='lg:hidden'>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            autoplay={true}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
            }}
            className='pb-[40px]!'
          >
            {cards.map((item) => (
              <SwiperSlide key={item.id}>
                <FeatureCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: Grid */}
        <div className='hidden lg:grid gap-[34px] grid-cols-3'>
          {cards.map((item) => (
            <FeatureCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ item }) {
  return (
    <div
      className='group rounded-2xl border bg-white transition-all duration-300 delay-75 hover:bg-secondary
      shadow-[0px_0px_18px_rgba(0,0,0,0.08)]
      hover:shadow-[0px_0px_28px_rgba(0,0,0,0.15)] hover:-translate-y-1'
    >
      <div className='p-5 pb-7'>
        <Link href={item.link} className='relative flex w-full justify-center'>
          <Image
            src={item.image}
            alt={item.title}
            width={377}
            height={195}
            className='mx-auto rounded-2xl object-cover'
          />
        </Link>

        <Link href={item.link} className='mt-5 block text-lg xl:text-[23px] font-bold mb-3 text-[#0A1B28] transition-colors duration-300 group-hover:text-white'>
          {item.title}
        </Link>
<Link href={item.link}>
        <p className='text-[15px] leading-relaxed text-[#0A1B28] font-medium transition-colors duration-300 group-hover:text-white'>
          {item.description}
        </p>
        </Link>
      </div>
    </div>
  )
}
