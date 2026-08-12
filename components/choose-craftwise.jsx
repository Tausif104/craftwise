import { useTranslations } from "next-intl";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ChooseCraftWise = () => {
  const t = useTranslations("ChooseCraftwise");

  const featuresItems = [
    { title: t("item1Title"), content: t("item1Content") },
    { title: t("item2Title"), content: t("item2Content") },
    { title: t("item3Title"), content: t("item3Content") },
    { title: t("item4Title"), content: t("item4Content") },
    { title: t("item5Title"), content: t("item5Content") },
  ];

  return (
    <section className="sec-padding-top">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="relative h-[320px] md:h-[420px] lg:h-[480px] w-full order-2 lg:order-1">
            <Image
              src="/images/thumbs/choose-craftwise-thumb.svg"
              alt="CraftWise Platform"
              fill
              className="object-contain"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="mb-6 text-left max-w-[500px]">
              {t("heading").split("CraftWise").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-primary">CraftWise</span>}
                </span>
              ))}
            </h2>

            <p className="text-lg text-gray-600 mb-6 text-left">
              {t("description")}
            </p>

            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="space-y-4"
            >
              {featuresItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-[15px] border-b-0 overflow-hidden transition-all duration-300 mb-2.5!"
                >
                  <AccordionTrigger className="text-lg md:text-[20px] font-semibold py-2 hover:no-underline data-[state=open]:text-primary">
                    {item.title}
                  </AccordionTrigger>

                  <AccordionContent className="text-gray leading-relaxed text-sm md:text-[16px] pb-4">
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

export default ChooseCraftWise;
