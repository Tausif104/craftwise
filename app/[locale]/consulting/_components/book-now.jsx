'use client';

import { useTranslations, useLocale } from "next-intl";
import { useLeadForm } from "@/lib/use-lead-form";
import SecondaryBtn from "@/components/global/SecondaryBtn";
import { User, Mail, Phone, Building2, Globe, Briefcase, Pencil, Check } from "lucide-react";
import Link from "next/link";
import Select from "react-select";

const customSelectStyles = {
    control: (base, state) => ({
        ...base,
        height: "60px",
        backgroundColor: state.isFocused ? "#ffffff" : "#F8FBFF",
        borderColor: state.isFocused ? "#F6D464" : "#E1E6ED",
        borderRadius: "10px",
        paddingLeft: "40px",
        boxShadow: "none",
        "&:hover": { borderColor: "#F6D464" }
    }),
    placeholder: (base) => ({ ...base, color: "#393E41" }),
    singleValue: (base) => ({ ...base, color: "#393E41" }),
    menu: (base) => ({
        ...base,
        backgroundColor: "#F8FBFF",
        borderRadius: "10px",
        padding: "6px",
        zIndex: 9999
    }),
    menuList: (base) => ({ ...base, padding: 0 }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "var(--primary)" : state.isFocused ? "#EEF4FF" : "transparent",
        color: state.isSelected ? "#fff" : "#393E41",
        padding: "12px 16px",
        borderRadius: "8px",
        cursor: "pointer"
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({ ...base, color: "#393E4180" })
};

const BookNow = () => {
    const t = useTranslations("ConsultingBookNow");
    const locale = useLocale();
    const lead = useLeadForm({ type: "CONSULTING", locale });

    const countryOptions = [
        { value: "DE", label: t("countryDE") },
        { value: "CH", label: t("countryCH") },
        { value: "AT", label: t("countryAT") },
    ];

    const companySizeOptions = [
        { value: "1",    label: t("size1") },
        { value: "2-5",  label: t("size2") },
        { value: "6-9",  label: t("size3") },
        { value: "10-19",label: t("size4") },
        { value: "20-49",label: t("size5") },
        { value: "50+",  label: t("size6") },
    ];

    const tradeOptions = [
        { value: "construction", label: t("tradeConstruction") },
        { value: "electrical",   label: t("tradeElectrical") },
        { value: "plumbing",     label: t("tradePlumbing") },
        { value: "hvac",         label: t("tradeHVAC") },
        { value: "carpentry",    label: t("tradeCarpentry") },
        { value: "painting",     label: t("tradePainting") },
        { value: "roofing",      label: t("tradeRoofing") },
        { value: "flooring",     label: t("tradeFlooring") },
        { value: "landscaping",  label: t("tradeLandscaping") },
        { value: "renovation",   label: t("tradeRenovation") },
        { value: "maintenance",  label: t("tradeFacility") },
        { value: "other",        label: t("tradeOther") },
    ];

    return (
        <section id="book-now" className="sec-padding-top">
            <div className="container">
                <div className="text-center max-w-[748px] mx-auto mb-10 lg:mb-16 pt-5 md:pt-0">
                    <h2 className="">
                        {t("headingPart1")}<span className="text-primary">{t("headingHighlight")}</span>{t("headingPart2")}
                    </h2>
                    <p className="md:mt-4 mt-2">{t("intro")}</p>
                </div>

                <div className="mx-auto">
                    <form className="space-y-4 md:space-y-6" onSubmit={lead.submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E41]/50 group-focus-within:text-primary transition-colors">
                                    <User size={20} />
                                </div>
                                <input type="text" name="firstName" placeholder={t("fieldFirstName")} className="w-full h-[60px] pl-12 pr-4 bg-[#F8FBFF] border border-[#E1E6ED] text-[#393E41] rounded-[10px] outline-none focus:border-primary focus:bg-white focus:text-primary transition-all placeholder-[#393E41]" />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E41]/50 group-focus-within:text-primary transition-colors">
                                    <User size={20} />
                                </div>
                                <input type="text" name="lastName" placeholder={t("fieldLastName")} className="w-full h-[60px] pl-12 pr-4 bg-[#F8FBFF] border border-[#E1E6ED] text-[#393E41] rounded-[10px] outline-none focus:border-primary focus:bg-white focus:text-primary transition-all placeholder-[#393E41]" />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E41]/50 group-focus-within:text-primary transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input type="email" name="email" placeholder={t("fieldEmail")} className="w-full h-[60px] pl-12 pr-4 bg-[#F8FBFF] border border-[#E1E6ED] text-[#393E41] rounded-[10px] outline-none focus:border-primary focus:bg-white focus:text-primary transition-all placeholder-[#393E41]" />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E41]/50 group-focus-within:text-primary transition-colors">
                                    <Phone size={20} />
                                </div>
                                <input type="tel" name="phone" placeholder={t("fieldPhone")} className="w-full h-[60px] pl-12 pr-4 bg-[#F8FBFF] border border-[#E1E6ED] text-[#393E41] rounded-[10px] outline-none focus:border-primary focus:bg-white focus:text-primary transition-all placeholder-[#393E41]" />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E41]/50 group-focus-within:text-primary transition-colors">
                                    <Building2 size={20} />
                                </div>
                                <input type="text" name="company" placeholder={t("fieldCompany")} className="w-full h-[60px] pl-12 pr-4 bg-[#F8FBFF] border border-[#E1E6ED] text-[#393E41] rounded-[10px] outline-none focus:border-primary focus:bg-white focus:text-primary transition-all placeholder-[#393E41]" />
                            </div>

                            <div className="relative group text-[#393E41]">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E41]/50 pointer-events-none z-5">
                                    <Globe size={20} />
                                </div>
                                <Select options={countryOptions} placeholder={t("fieldCountry")} styles={customSelectStyles} isSearchable={true} />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E41]/50 pointer-events-none z-5">
                                    <Briefcase size={20} />
                                </div>
                                <Select options={tradeOptions} placeholder={t("fieldTrade")} styles={customSelectStyles} isSearchable={true} />
                            </div>

                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#393E41]/50 pointer-events-none z-5">
                                    <Mail size={20} />
                                </div>
                                <Select options={companySizeOptions} placeholder={t("fieldCompanySize")} styles={customSelectStyles} isSearchable={true} />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute left-4 top-[18px] text-[#393E41]/50 pointer-events-none">
                                <Pencil size={20} />
                            </div>
                            <textarea name="message" placeholder={t("fieldDescription")} className="w-full h-[150px] pl-12 pr-4 py-4 bg-[#F8FBFF] border border-[#E1E6ED] text-[#393E41] rounded-[10px] outline-none focus:border-primary focus:bg-white focus:text-primary transition-all resize-none placeholder-[#393E41]"></textarea>
                        </div>

                        <div className="space-y-4 pt-4">
                            <p className="text-sm text-[#393E41] leading-relaxed">
                                {t("privacyText")}{" "}<Link href="/privacy-policy" className="text-primary hover:underline">{t("privacyLink")}</Link>.
                            </p>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center mt-1">
                                    <input type="checkbox" name="consent" className="peer sr-only" />
                                    <div className="w-4 h-4 rounded border border-[#E1E6ED] bg-white transition-all peer-checked:bg-primary peer-checked:border-primary"></div>
                                    <Check className="w-3.5 h-3.5 text-white absolute opacity-0 scale-50 transition-all peer-checked:opacity-100 peer-checked:scale-100 pointer-events-none" />
                                </div>
                                <span className="text-sm text-[#393E41] leading-relaxed group-hover:text-primary transition-colors">
                                    {t("newsletter")}
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col items-center gap-4 pt-4 md:pt-8">
                            <button
                                type="submit"
                                disabled={lead.isSending}
                                className="secondary-btn min-w-full md:min-w-[280px] h-[60px] px-8 text-white text-[17px] font-bold rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <span>{lead.isSending ? lead.message : t("submit")}</span>
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
        </section>
    );
};

export default BookNow;
