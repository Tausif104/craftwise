import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { normalizeLocalizedHref } from '@/lib/normalize-localized-href'

const OutlineButton = ({ link, text }) => {
  return (
    <Link
      href={normalizeLocalizedHref(link)}
      className='shine-btn inline-block text-[16px] font-semibold px-10 py-4 text-white border border-primary rounded-full transition-all duration-300 transform'
    >
      <div className='flex items-center gap-2'>
        {text} <ArrowRight className='inline-block w-5' />
      </div>
    </Link>
  )
}

export default OutlineButton
