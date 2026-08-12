"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const FeatureComparison = () => {
    const t = useTranslations("FeatureComparison");

    const features = Array.from({ length: 11 }, (_, i) => ({
        area: t(`row${i + 1}Area`),
        onSite: t(`row${i + 1}OnSite`),
        office: t(`row${i + 1}Office`),
        management: t(`row${i + 1}Management`),
        owner: t(`row${i + 1}Owner`),
    }));

    return (
        <section className="sec-padding-top">
            <div className="container">
                <h2 className="text-center">{t("heading")}</h2>
                <div className="inner-gap">

                    <div className="overflow-x-auto  rounded-[12px] border border-[#87CCFF] ">
                        <table className="w-full text-left border-collapse ">
                            <thead>
                                <tr className="text-white">
                                    <th className="bg-secondary md:p-6 p-4 text-[18px] font-bold w-[25%] border-r border-[#87CCFF] uppercase tracking-tight">{t("colFeatures")}</th>
                                    <th className="bg-[#467293] md:p-6 p-4 text-[18px] font-semibold w-[18.75%] border-r border-[#87CCFF]">{t("colOnSite")}</th>
                                    <th className="bg-[#467293] md:p-6 p-4 text-[18px] font-semibold w-[18.75%] border-r border-[#87CCFF]">{t("colOffice")}</th>
                                    <th className="bg-[#467293] md:p-6 p-4 text-[18px] font-semibold w-[18.75%] border-r border-[#87CCFF]">{t("colManagement")}</th>
                                    <th className="bg-[#467293] md:p-6 p-4 text-[18px] font-semibold w-[18.75%]">{t("colOwner")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((item, index) => (
                                    <tr key={index} className={`border-b border-[#87CCFF] group transition-colors ${index % 2 === 1 ? 'bg-[#F5F9FF]' : 'bg-white'}`}>
                                        <td className="md:p-6 p-4 bg-[#D3EAFB] text-[#0A1B28] font-bold text-[15px] border-r border-[#87CCFF] align-middle">
                                            {item.area}
                                        </td>
                                        <td className="md:p-6 p-4 text-[#393E41] font-medium text-[14px] leading-relaxed border-r border-[#87CCFF] align-middle group-hover:bg-gray-50/50 transition-colors">
                                            {item.onSite}
                                        </td>
                                        <td className="md:p-6 p-4 text-[#393E41] font-medium text-[14px] leading-relaxed border-r border-[#87CCFF] align-middle group-hover:bg-gray-50/50 transition-colors">
                                            {item.office}
                                        </td>
                                        <td className="md:p-6 p-4 text-[#393E41] font-medium text-[14px] leading-relaxed border-r border-[#87CCFF] align-middle group-hover:bg-gray-50/50 transition-colors">
                                            {item.management}
                                        </td>
                                        <td className="md:p-6 p-4 text-[#393E41] font-medium text-[14px] leading-relaxed align-middle group-hover:bg-gray-50/50 transition-colors">
                                            {item.owner}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="md:pt-[80px] pt-[50px] space-y-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        <div className="bg-[#F8FBFF] border border-[#DEEFFF] rounded-[24px] p-4 md:p-10 h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-[56px] h-[56px] relative flex items-center justify-center">
                                    <Image src="/images/pricing/pricing-01.svg" alt="" className="object-cover" fill />
                                </div>
                                <h4 className="text-[24px] font-bold text-[#0A1B28]">{t("card1Title")}</h4>
                            </div>
                            <ul className="space-y-6">
                                {[t("card1Bullet1"), t("card1Bullet2"), t("card1Bullet3"), t("card1Bullet4"), t("card1Bullet5")].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#304C61] flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white stroke-[3]" />
                                        </div>
                                        <span className="text-[16px] text-[#393E41] leading-relaxed font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#F8FBFF] border border-[#DEEFFF] rounded-[24px] p-4 md:p-10 h-full">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-[56px] h-[56px] relative flex items-center justify-center">
                                    <Image src="/images/pricing/pricing-02.svg" alt="" className="object-cover" fill />
                                </div>
                                <h4 className="text-[24px] font-bold text-[#0A1B28]">{t("card2Title")}</h4>
                            </div>
                            <p className="text-[#393E41] mb-8 font-medium">{t("card2Subtitle")}</p>
                            <ul className="space-y-6">
                                {[t("card2Bullet1"), t("card2Bullet2"), t("card2Bullet3"), t("card2Bullet4"), t("card2Bullet5"), t("card2Bullet6")].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#CC8640] flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white stroke-[3]" />
                                        </div>
                                        <span className="text-[16px] text-[#393E41] leading-relaxed font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#F8FBFF] border border-[#DEEFFF] rounded-[24px] p-4 md:p-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-[56px] h-[56px] relative flex items-center justify-center">
                                <Image src="/images/pricing/pricing-03.svg" alt="" className="object-cover" fill />
                            </div>
                            <h4 className="text-[24px] font-bold text-[#0A1B28]">{t("card3Title")}</h4>
                        </div>
                        <p className="text-[#393E41] leading-relaxed text-[16px] font-medium max-w-[850px] whitespace-pre-line">
                            {t("card3Body")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureComparison;