import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const IndustrySpecificSoftware = ({ heading, subtext, items = [], headingClass = "" }) => {
  return (
    <section className="sec-padding-top sec-padding-bottom">
      <div className="container mx-auto px-6">
        <div className="mb-15">
          <h2 className={`mb-5 text-center ${headingClass}`}>{heading}</h2>
          <p className="xl:px-10 text-center mx-auto max-w-[650px]">{subtext}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[320px] md:h-[420px] lg:h-[480px] w-full">
            <Image
              src="/images/thumbs/industry-specific-software-thumb.svg"
              alt="Industry-Specific Software Illustration"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-4"
            >
              {items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-[#B9C9FF] text-[#304C61] last:border-b rounded-[15px] px-3 md:px-4 overflow-hidden
                  transition-all duration-300
                  data-[state=open]:border-primary/50
                  data-[state=open]:shadow-[0px_5px_18px_0px_#0000000D]"
                >
                  <AccordionTrigger className="text-lg md:text-[20px] text-[#304C61] font-semibold py-4 hover:no-underline data-[state=open]:text-primary">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#18181899] leading-relaxed text-sm md:text-[16px] pb-4">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySpecificSoftware;
