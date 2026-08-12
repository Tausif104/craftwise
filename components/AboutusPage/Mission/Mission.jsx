"use client";

import { useTranslations } from "next-intl";

const Mission = () => {
    const t = useTranslations("Mission");

    return (
        <div className="sec-padding-top">
            <div className="container">
                <div className="border border-[#F8FBFF] rounded-[12px] py-4 px-4 lg:py-7 lg:px-7 shadow-[0px_5px_18px_0px_#00000014] text-center">
                    <h3 className="text-[#181818]">{t("heading")}</h3>
                    <p className="max-w-[1171px] mx-auto pt-3 md:pt-4">{t("body")}</p>
                </div>
            </div>
        </div>
    );
};

export default Mission;
