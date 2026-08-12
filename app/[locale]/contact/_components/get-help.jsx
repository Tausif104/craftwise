import CommonCard from "@/components/global/CommonCard";
import { useTranslations } from "next-intl";

const GetHelp = () => {
    const t = useTranslations("ContactPage.getHelpSection");

    const valuesData = [
        {
            icon: "/images/contact/get-help-icon1.svg",
            title: t("card1.title"),
            description: t("card1.text"),
            subtitle: "product@craft-wise.de",
            buttonLabel: t("card1.cta"),
            buttonLink: "/book-demo#demo-area",
        },
        {
            icon: "/images/contact/get-help-icon2.svg",
            title: t("card2.title"),
            description: t("card2.text"),
            subtitle: "consulting@craft-wise.de",
            buttonLabel: t("card2.cta"),
            buttonLink: "mailto:consulting@craft-wise.de",
        },
        {
            icon: "/images/contact/get-help-icon3.svg",
            title: t("card3.title"),
            description: t("card3.text"),
            subtitle: "support@craft-wise.de",
            buttonLabel: t("card3.cta"),
            buttonLink: "mailto:support@craft-wise.de",
        },
        {
            icon: "/images/contact/get-help-icon4.svg",
            title: t("card4.title"),
            description: t("card4.text"),
            subtitle: "partners@craft-wise.de",
            buttonLabel: t("card4.cta"),
            buttonLink: "mailto:partners@craft-wise.de",
        },
        {
            icon: "/images/contact/get-help-icon6.svg",
            title: t("card5.title"),
            description: t("card5.text"),
            subtitle: "affiliates@craft-wise.de",
            buttonLabel: t("card5.cta"),
            buttonLink: "mailto:affiliates@craft-wise.de",
        },
        {
            icon: "/images/contact/get-help-icon5.svg",
            title: t("card6.title"),
            description: t("card6.text"),
            subtitle: "press@craft-wise.de",
            buttonLabel: t("card6.cta"),
            buttonLink: "mailto:press@craft-wise.de",
        },
    ];

    return (
        <section className="sec-padding-top ">
            <div className="container">
                <h3 className="text-center">{t("heading")}</h3>
                <div className="inner-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {valuesData.map((item) => (
                        <CommonCard
                            key={item.title}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            subtitle={item.subtitle}
                            buttonLabel={item.buttonLabel}
                            buttonLink={item.buttonLink}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GetHelp;
