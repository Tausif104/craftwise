import CommonCard from "@/components/global/CommonCard"
import { useTranslations } from "next-intl";


const CraftWise = () => {
    const t = useTranslations("LandingPage.whyCraftWiseSection");
    const valuesData = [
        {
            icon: "/images/landing/craft-icon1.svg",
            title: t("card1.title"),
            description: t("card1.text"),
        },
        {
            icon: "/images/landing/craft-icon2.svg",
            title: t("card2.title"),
            description: t("card2.text"),
        },
        {
            icon: "/images/landing/craft-icon3.svg",
            title: t("card3.title"),
            description: t("card3.text"),
        },
    ]

    return (
        <section className="sec-padding-top sec-padding-bottom">
            <div className="container">
                <div>
                    <h3 className="text-center">{t("heading")}</h3>
                    <p className="max-w-2xl text-base text-center mx-auto md:pt-5 pt-3">{t("subtext")}</p>
                </div>
                <div className="inner-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {valuesData.map((item, index) => (
                        <CommonCard
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>

        </section>
    )
}

export default CraftWise
