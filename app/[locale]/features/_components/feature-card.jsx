import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const FeatureCard = ({ feature, linkText = 'Learn More' }) => {
  const { image, title, description, href } = feature
  return (
    <div className='bg-white p-3.5 shadow-[0px_0px_18px_rgba(0,0,0,0.08)] rounded-3xl transition-transform duration-300 hover:-translate-y-2'>
      <div>
        <Image
          className='w-full h-auto'
          src={image}
          width={400}
          height={200}
          alt={title}
        />
      </div>
      <div className='mt-7.5 pb-3.5'>
        <h3 className='text-[24px] text-text-secondary text-center'>{title}</h3>
        <p className='text-gray text-center text-[16px] my-3'>{description}</p>
        <Link
          href={href}
          className='flex items-center justify-center text-[16px] text-[#CC8640] font-semibold gap-1'
        >
          <span>{linkText}</span> <ArrowRight className='max-w-5' />
        </Link>
      </div>
    </div>
  )
}

export default FeatureCard
