import SecoundaryBtn from '@/components/global/secoundary-btn'
import Image from 'next/image'
import ListItemCheck from './list-item-check'

const FeaturedCheckListSection = ({ heading1, headingHighlight, heading2, items = [], ctaText }) => {
  return (
    <section className='sec-padding-top sec-padding-bottom'>
      <div className='container px-6 mx-auto'>
        <div className='lg:grid lg:grid-cols-7 flex flex-col-reverse gap-10'>
          <div className='col-span-4 self-center'>
            <div className='text-left mx-auto'>
              <h2 className='text-text-secondary'>
                {heading1}<span className='text-primary'>{headingHighlight}</span>{heading2}
              </h2>

              <ul className='space-y-3 md:my-10 my-5'>
                {items.map((item, i) => (
                  <ListItemCheck key={i} text={item} />
                ))}
              </ul>

              <SecoundaryBtn text={ctaText} link='/' />
            </div>
          </div>

          {/* thumbnail */}
          <div className='col-span-3 self-center'>
            <Image
              src='/images/thumbs/why-craftwise.svg'
              width={800}
              height={400}
              alt={`${heading1}${headingHighlight}${heading2}`}
              className='object-contain lg:max-w-full md:max-w-100 max-w-70'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCheckListSection
