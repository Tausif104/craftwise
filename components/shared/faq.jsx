import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion'
import { getFaqs } from '@/lib/content-source'

/**
 * Shared FAQ section.
 *
 * Pass `pageKey` and the section loads its questions from the CMS for that page
 * and locale. The `faqItems` prop stays supported and is used as the fallback
 * when the CMS has nothing for this page or the database is unreachable, so a
 * failure renders the copy that shipped with the build rather than an empty
 * section.
 *
 * This is a server component, so the fetch happens here instead of forcing
 * every page to thread the data down.
 */
const FAQ = async ({ faqItems, topPadding, heading, pageKey, locale = 'de' }) => {
  const cmsItems = pageKey ? await getFaqs(pageKey, locale) : null
  const items = cmsItems?.length ? cmsItems : faqItems

  if (!items?.length) return null

  return (
    <section
      className={` ${topPadding ? `sec-padding-top` : ''} sec-padding-bottom`}
    >
      <div className='container mx-auto px-6 max-w-[920px]!'>
        <h2 className=' text-center mb-8 xl:mb-12'>
          {heading ? heading : 'FAQs'}
        </h2>
        <Accordion type='single' collapsible defaultValue="item-0" className='space-y-4'>
          {items.map((item, index) => (
            <AccordionItem
              key={item.id ?? index}
              value={`item-${index}`}
              className='border-0'
            >
              <AccordionTrigger
                className='text-xl font-semibold border-b border-[#D8DAE0] rounded-none
                data-[state=open]:text-primary cursor-pointer accordion-trigger hover:no-underline'
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='text-[#181818] text-base  pb-4 pt-6'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQ
