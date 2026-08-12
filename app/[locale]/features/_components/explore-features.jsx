'use client'
import FeatureCard from './feature-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

const ExploreFeatures = ({ heading1, heading2, features = [], learnMore }) => {
  return (
    <section className='sec-padding-top sec-padding-bottom testimonials'>
      <div className='container px-6'>
        <div className='text-center max-w-4xl mx-auto mb-12'>
          <h2 className='mb-5'>
            {heading1}<span className='text-primary'>{heading2}</span>
          </h2>
        </div>

        {/* Mobile + Tablet: Swiper */}
        <div className='lg:hidden'>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            autoplay={true}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 , },
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2 , spaceBetween: 20 },
            }}
            className='pb-[50px]! swiper-overflow-visible'
          >
            {features.map((item, index) => (
              <SwiperSlide key={index}>
                <FeatureCard feature={item} linkText={learnMore} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: Grid */}
        <div className='hidden lg:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6'>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} linkText={learnMore} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreFeatures
