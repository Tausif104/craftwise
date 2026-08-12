import OutlineButton from '@/components/global/outline-btn'
import PrimaryBtn from '@/components/global/primary-btn'
import Image from 'next/image'

const SeeForYourself = ({ heading, body1, body2, primaryCta, secondaryCta, image = '/images/thumbs/see-for-yourself.webp' }) => {
  return (
    <section className='bg-[#304C61] sec-padding-top sec-padding-bottom'>
      <div className='container px-6 mx-auto'>
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-10'>
          <div className='col-span-1 self-center'>
            <Image
              src={image}
              width={740}
              height={410}
              alt={heading}
              className='w-full'
            />
          </div>

          <div className='col-span-1 self-center'>
            <h2 className='text-white font-bold xl:text-[48px] text-[30px] mb-7'>
              {heading}
            </h2>
            <p className='text-white lg:text-[20px] text-[15px] mb-3'>
              {body1}
            </p>
            <p className='text-white lg:text-[20px] text-[15px] mb-7'>
              {body2}
            </p>
            <div className='flex xl:items-center items-start xl:flex-row flex-col gap-5'>
              <PrimaryBtn text={primaryCta} link='/registration' className='h-[58px]' />
              <OutlineButton text={secondaryCta} link='/' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeeForYourself
