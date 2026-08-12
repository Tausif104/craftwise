'use client'
import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion'
import { ChevronDown, Minus, Plus } from 'lucide-react'

export default function FAQSection({ heading, chooseCategoryPlaceholder, categories, faqData }) {
  const [selectedCategory, setSelectedCategory] = useState('getting-started')
  const [openItem, setOpenItem] = useState('item-0')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const selectedCategoryData = categories.find(
    (category) => category.slug === selectedCategory
  )

  useEffect(() => {
    setOpenItem('item-0')
    setIsCategoryOpen(false)
  }, [selectedCategory])

  return (
    <section className='sec-padding-top sec-padding-bottom faq-section'>
      <div className='container mx-auto px-6'>
        <h2 className='mb-6 lg:mb-15 text-center text-[28px] md:text-4xl font-bold text-[#212D3C]'>
          {heading}
        </h2>

        <div className='relative z-20 md:hidden mb-6'>
          <button
            type='button'
            onClick={() => setIsCategoryOpen((prev) => !prev)}
            className='flex w-full items-center justify-between rounded-[14px] bg-[#304C61] px-5 py-4 text-left text-[16px] font-semibold text-white shadow-[0px_14px_35px_rgba(10,27,40,0.18)]'
            aria-expanded={isCategoryOpen}
            aria-controls='faq-category-menu'
          >
            <span>{selectedCategoryData?.name || chooseCategoryPlaceholder}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${
                isCategoryOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isCategoryOpen && (
            <div
              id='faq-category-menu'
              className='absolute left-0 right-0 top-[calc(100%+8px)] rounded-[14px] border border-white/5 bg-[#304C61] p-2 shadow-[0px_18px_45px_rgba(10,27,40,0.22)]'
            >
              <div className='space-y-1'>
                {categories.map((fCat) => {
                  const isActive = selectedCategory === fCat.slug

                  return (
                    <button
                      key={fCat.id}
                      type='button'
                      onClick={() => setSelectedCategory(fCat.slug)}
                      className={`block w-full rounded-xl px-4 py-3.5 text-left text-[16px] font-medium leading-none transition-colors duration-200 ${
                        isActive
                          ? 'bg-white/8 text-white'
                          : 'text-white/90 hover:bg-white/8 hover:text-white'
                      }`}
                    >
                      {fCat.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col md:flex-row gap-3.5'>
          {/* Sidebar */}
          <div className='hidden md:block md:max-w-[300px] lg:max-w-[425px] w-full p-6 rounded-2xl border border-[#CCE1FC]'>
            <ul className='space-y-4'>
              {categories.map((fCat) => {
                const isActive = selectedCategory === fCat.slug

                return (
                  <li
                    onClick={() => setSelectedCategory(fCat.slug)}
                    key={fCat.id}
                    className={`group rounded-xl border p-4 font-semibold cursor-pointer transition-all
            ${
              isActive
                ? 'bg-secondary text-white border-secondary relative faq-cat__active'
                : 'border-[#CCE1FC] text-[#212D3C] hover:bg-secondary hover:text-white'
            }
          `}
                  >
                    <button className='text-base lg:text-lg w-full text-left cursor-pointer'>
                      {fCat.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right Side Content - FAQ */}
          <div className='flex-1 md:px-6 faq-content'>
            <div className='space-y-4'>
              <Accordion
                type='single'
                collapsible
                value={openItem}
                onValueChange={setOpenItem}
                className='space-y-4'
              >
                {(faqData[selectedCategory] || []).map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className='border border-[#C9D6F3] rounded-lg last:border-b! overflow-hidden'
                  >
                    <AccordionTrigger className='py-3 md:py-4 px-4 text-[16px] md:text-2xl leading-snug font-medium cursor-pointer transition-all data-[state=open]:text-white data-[state=open]:bg-secondary rounded-t-lg! rounded-none hover:no-underline'>
                      <div className='flex justify-between items-center gap-3 w-full'>
                        <span className='flex-1 text-left'>{faq.title}</span>
                        <span className='shrink-0 text-xl font-semibold'>
                          {openItem === `item-${index}` ? <Minus /> : <Plus />}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='p-4 text-sm md:text-base leading-relaxed'>
                      <p>{faq.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
