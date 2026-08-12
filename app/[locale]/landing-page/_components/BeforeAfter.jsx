import Image from "next/image";
import { FaCheck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { TiInfo } from "react-icons/ti";
import { useTranslations } from "next-intl";

const BeforeAfter = () => {
    const t = useTranslations("LandingPage.beforeAfterSection");

    return (
        <section className="">
            <div className="container mx-auto px-4">
                <h2 className="text-center mb-8 md:mb-12">{t("heading")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 relative">
                    <Image className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-9 hidden sm:block" src='/images/landing/arrow.svg' alt='arrow' width={60} height={60} />
                    <div className="bg-[#F8FBFF] border border-[#C8DEF7] p-7 rounded-t-3xl sm:rounded-t-none sm:rounded-l-4xl">
                        <div className="flex items-center gap-4 mb-7">
                            <div className="lg:h-16 h-11 w-11 lg:w-16 rounded-full bg-red-100 flex items-center justify-center text-primary shrink-0">
                                <TiInfo className="lg:size-8 size-5 text-red-500" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl">{t("leftColumnTitle")}</h3>
                        </div>
                        <ul className="space-y-7">
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaTimesCircle className="size-5 mt-1 shrink-0 text-red-500" /> {t("leftBullets.1")}</li>
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaTimesCircle className="size-5 mt-1 shrink-0 text-red-500" /> {t("leftBullets.2")}</li>
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaTimesCircle className="size-5 mt-1 shrink-0 text-red-500" /> {t("leftBullets.3")}</li>
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaTimesCircle className="size-5 mt-1 shrink-0 text-red-500" /> {t("leftBullets.4")}</li>
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaTimesCircle className="size-5 mt-1 shrink-0 text-red-500" /> {t("leftBullets.5")}</li>
                        </ul>
                    </div>
                    <div className="bg-[#F8FBFF] border border-[#C8DEF7] p-7 sm:pl-10 rounded-b-3xl sm:rounded-bl-none sm:rounded-r-4xl">
                        <div className="flex items-center gap-4 mb-7">
                            <div className="lg:h-16 h-11 w-11 lg:w-16 rounded-full bg-green-100 flex items-center justify-center text-primary shrink-0">
                                <FaCheck className="lg:size-8 size-5 text-green-500" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl">{t("rightColumnTitle")}</h3>
                        </div>
                        <ul className="space-y-7">
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaCheckCircle className="size-5 mt-1 shrink-0 text-green-500" />{t("rightBullets.1")}</li>
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaCheckCircle className="size-5 mt-1 shrink-0 text-green-500" />{t("rightBullets.2")}</li>
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaCheckCircle className="size-5 mt-1 shrink-0 text-green-500" />{t("rightBullets.3")}</li>
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaCheckCircle className="size-5 mt-1 shrink-0 text-green-500" />{t("rightBullets.4")}</li>
                            <li className="flex items-start gap-2.5 text-lg lg:text-xl"><FaCheckCircle className="size-5 mt-1 shrink-0 text-green-500" />{t("rightBullets.5")}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
