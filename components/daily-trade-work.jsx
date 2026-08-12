import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const DailyTradeWork = ({ heading, items = [] }) => {
  return (
    <section className="">
      <div className="bg-secondary sec-padding-top sec-padding-bottom">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <h2 className="text-white mb-4 lg:mb-10">
                {heading?.split(/(CraftWise)/g).map((part, i) =>
                  part === "CraftWise" ? (
                    <span key={i} className="text-primary">{part}</span>
                  ) : (
                    part
                  )
                )}
              </h2>

              <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
                {items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-0 rounded-[12px] px-4 md:px-5 transition-all duration-300 bg-[#3D586E] data-[state=open]:bg-white overflow-hidden shadow-none"
                  >
                    <AccordionTrigger className="text-lg md:text-[20px] font-semibold py-3 hover:no-underline text-white data-[state=open]:text-[#304C61] border-0 rounded-none cursor-pointer [&>svg]:text-white data-[state=open]:[&>svg]:text-text-secondary">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#18181899] data-[state=open]:text-gray leading-relaxed text-sm md:text-[16px] pb-5">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="relative h-[300px] md:h-[450px] lg:h-[550px] w-full">
              <Image
                src="/images/thumbs/daily-trade-work-thumb.svg"
                alt="How CraftWise Supports Daily Trade Work"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyTradeWork;
