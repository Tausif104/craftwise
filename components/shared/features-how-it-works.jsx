import Image from 'next/image'
import { FaCheckCircle } from 'react-icons/fa'
import LottiePlayer from './lottie-player'

const FeaturesHowItWorks = ({ data }) => {
  const { title, description, descriptionTwo, image, video, items, maxW } = data

  return (
    <section className='sec-padding-top'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center'>
          {/* Visual: Lottie animation when provided, otherwise static image */}
          <div className='order-2 lg:order-1'>
            {video ? (
              <LottiePlayer src={video} className='w-full max-w-full' />
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className='max-w-full'
              />
            )}
          </div>

          {/* Content */}
          <div className='order-1 lg:order-2'>
            <h2 className='text-secondary mb-4'>{title}</h2>

            <div className={`${maxW ? maxW : "max-w-[560px]"}  mb-10  text-[#393E41]`}>
              <p className=''>{description}</p>{
              descriptionTwo && <p >{descriptionTwo}</p>
            }
            </div>


            <ul className='space-y-3'>
              {items.map((item, index) => (
                <li key={index} className='flex items-start'>
                  <FaCheckCircle className='text-primary mr-4 mt-1.5 w-5 flex-shrink-0' />
                  <span className='text-[20px] font-semibold text-[#304C61]'>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesHowItWorks
