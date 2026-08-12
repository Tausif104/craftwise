"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Select from "react-select";
import { useTranslations, useLocale } from "next-intl";
import { useLeadForm } from "@/lib/use-lead-form";

const ContactUs = () => {
    const t = useTranslations("ContactPage.contactUsSection");
    const locale = useLocale();
    const lead = useLeadForm({ type: "CONTACT", locale });

    const customSelectStyles = {
        control: (base, state) => ({
            ...base,
            height: "48px",
            backgroundColor: state.isFocused ? "#ffffff" : "#F8F9FA",
            borderColor: state.isFocused ? "#F6D464" : "#E1E6ED",
            borderRadius: "10px",
            paddingLeft: "10px",
            boxShadow: "none",
            "&:hover": {
                borderColor: "#F6D464",
            },
        }),
        placeholder: (base) => ({
            ...base,
            color: "#393E41",
        }),
        singleValue: (base) => ({
            ...base,
            color: "#393E41",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#F8FBFF",
            borderRadius: "10px",
            padding: "6px",
            zIndex: 9999,
        }),
        menuList: (base) => ({
            ...base,
            padding: 0,
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "var(--primary)" : state.isFocused ? "#EEF4FF" : "transparent",
            color: state.isSelected ? "#fff" : "#393E41",
            padding: "12px 16px",
            borderRadius: "8px",
            cursor: "pointer",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#393E4180",
        }),
    };

    const tradeOptions = [
        { value: "construction" },
        { value: "electrical" },
        { value: "plumbing" },
        { value: "hvac" },
        { value: "carpentry" },
        { value: "painting" },
        { value: "roofing" },
        { value: "flooring" },
        { value: "landscaping" },
        { value: "renovation" },
        { value: "maintenance" },
        { value: "other" },
    ].map((option) => ({ ...option, label: t(`tradeOptions.${option.value}`) }));

    return (
        <section className="sec-padding-top sec-padding-bottom">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <div className="max-w-[500px] md:sticky md:top-40">
                        <h2 className="text-[32px] md:text-[48px] font-bold text-text-secondary leading-[1.1] mb-6">
                            {t("heading")}
                        </h2>
                        <p className="text-[#393E41] text-[16px] md:text-[18px] mb-8 leading-relaxed">
                            {t("bodyText")}
                        </p>

                        <div className="flex items-center -space-x-4 mb-10">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm">
                                    <Image
                                        src={`/images/contact/user-${i}.png`}
                                        alt={`Support Team ${i}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            <p>{t("availabilityText")}</p>

                            <div className="space-y-3 mt-4">
                                <p className="text-lg font-semibold flex items-center gap-2">
                                    {t("serviceHoursLabel")} <span className="text-primary">{t("serviceHoursValue")}</span>
                                </p>
                                <p className="text-lg font-semibold flex items-center gap-2">
                                    {t("responseTimeLabel")} <span className="text-primary">{t("responseTimeValue")}</span>
                                </p>
                            </div>

                            <div className="flex items-start gap-4 pt-4 md:pt-10">
                                <div className="w-14 h-14 rounded-full bg-[#F5F7F8] flex items-center justify-center text-primary shrink-0 transition-transform hover:scale-105 cursor-pointer">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-[#5C5E5E] text-lg mb-1">{t("contactOptionEmail")}</p>
                                    <a href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`} className="text-[24px] md:text-[24px] font-medium text-text-secondary hover:text-primary transition-colors block">
                                        {process.env.NEXT_PUBLIC_MAIL}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 mt-4 md:mt-6">
                                <div className="w-14 h-14 rounded-full bg-[#F5F7F8] flex items-center justify-center text-primary shrink-0 transition-transform hover:scale-105 cursor-pointer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[#5C5E5E] text-lg mb-1">{t("contactOptionWhatsapp")}</p>
                                    <a href="https://wa.me/496958003098" target="_blank" className="text-[24px] md:text-[24px] font-medium text-text-secondary hover:text-primary transition-colors block">
                                        +49 69 58003098
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#161E550A] rounded-[24px] p-4 md:p-5 relative overflow-hidden">
                        <div className="bg-white/90 p-4 md:p-7 rounded-[24px] backdrop-blur-sm">
                            <form className="space-y-6 relative z-10" onSubmit={lead.submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[16px] font-medium text-text-secondary">{t("fields.firstName.label")}</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder={t("fields.firstName.placeholder")}
                                            className="w-full h-[48px] px-4 bg-[#F8F9FA] rounded-[8px] border border-[#E9EBF5] focus:ring-2 focus:ring-primary outline-none text-[#393E41] placeholder:text-[#393E41]/40"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[16px] font-medium text-text-secondary">{t("fields.lastName.label")}</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder={t("fields.lastName.placeholder")}
                                            className="w-full h-[48px] px-4 bg-[#F8F9FA] rounded-[8px] border border-[#E9EBF5] focus:ring-2 focus:ring-primary outline-none text-[#393E41] placeholder:text-[#393E41]/40"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[16px] font-medium text-text-secondary">{t("fields.companyName.label")}</label>
                                        <input
                                            type="text"
                                            name="company"
                                            placeholder={t("fields.companyName.placeholder")}
                                            className="w-full h-[48px] px-4 bg-[#F8F9FA] rounded-[8px] border border-[#E9EBF5] focus:ring-2 focus:ring-primary outline-none text-[#393E41] placeholder:text-[#393E41]/40"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[16px] font-medium text-text-secondary">{t("fields.email.label")}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder={t("fields.email.placeholder")}
                                            className="w-full h-[48px] px-4 bg-[#F8F9FA] rounded-[8px] border border-[#E9EBF5] focus:ring-2 focus:ring-primary outline-none text-[#393E41] placeholder:text-[#393E41]/40"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[16px] font-medium text-text-secondary">{t("fields.phoneNumber.label")}</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder={t("fields.phoneNumber.placeholder")}
                                            className="w-full h-[48px] px-4 bg-[#F8F9FA] rounded-[8px] border border-[#E9EBF5] focus:ring-2 focus:ring-primary outline-none text-[#393E41] placeholder:text-[#393E41]/40"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[16px] font-medium text-text-secondary">{t("fields.trade.label")}</label>
                                        <Select
                                            options={tradeOptions}
                                            placeholder={t("fields.trade.placeholder")}
                                            styles={customSelectStyles}
                                            isSearchable={true}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[16px] font-medium text-text-secondary">{t("fields.message.label")}</label>
                                        <textarea
                                            name="message"
                                            placeholder={t("fields.message.placeholder")}
                                            rows={6}
                                            className="w-full px-4 py-4 bg-[#F8F9FA] rounded-[8px] border border-[#E9EBF5] focus:ring-2 focus:ring-primary outline-none text-[#393E41] placeholder:text-[#393E41]/40"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="consent"
                                            className="w-5 min-w-[20px] h-5 mt-1 rounded-[4px] border border-[#DEDEDE] bg-[#F5F5F5] checked:bg-primary checked:border-primary appearance-none cursor-pointer transition-all relative checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white checked:after:rotate-45"
                                        />
                                        <span className="text-[14px] md:text-[15px] text-[#393E41] leading-snug group-hover:text-text-secondary transition-colors">
                                            {t("checkboxText")}
                                        </span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <span className="text-[14px] md:text-[15px] text-[#393E41] leading-snug group-hover:text-text-secondary transition-colors">
                                            {t("privacyText")}{" "}
                                            <Link href="/privacy-policy" className="text-primary hover:underline font-semibold transition-all">
                                                {t("privacyPolicyLinkText")}
                                            </Link>
                                            .
                                        </span>
                                    </label>
                                </div>

                                <div className="pt-4 md:pt-8 flex flex-col items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={lead.isSending}
                                        className="w-full md:w-auto min-w-full md:min-w-[280px] h-[64px] bg-primary cursor-pointer hover:bg-[#d27e2a] disabled:opacity-70 disabled:cursor-not-allowed text-white text-[18px] font-bold rounded-full shadow-[0px_10px_30px_rgba(204,134,64,0.3)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        <span>{lead.isSending ? lead.message : t("buttonText")}</span>
                                        {lead.isSending ? null : <span>&rarr;</span>}
                                    </button>

                                    {lead.status === "success" || lead.status === "error" ? (
                                        <p
                                            role="status"
                                            aria-live="polite"
                                            className={`text-[15px] font-medium text-center ${
                                                lead.status === "success" ? "text-[#217A39]" : "text-[#B42318]"
                                            }`}
                                        >
                                            {lead.message}
                                        </p>
                                    ) : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
