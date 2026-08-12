"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const ExtendedTeam = () => {
    const t = useTranslations("ExtendedTeam");

    return (
        <section className="pt-[60px] lg:pt-[150px]  overflow-hidden">

            <div className="container ">
                <div className="bg-[#F8FBFF] p-4 lg:p-10 rounded-[20px] flex flex-col lg:flex-row items-center justify-center   side-gap">
                    <div className="max-w-[709px]">
                        <h2 className="">{t("headingPart1")}<span className="text-primary">{t("headingHighlight")}</span>{t("headingPart2")}</h2>
                        <p className="pt-2.5 md:pt-5">{t("body")}</p>
                    </div>
                    <div className="relative flex-1">
                        <div className="relative xl:absolute xl:-top-48 xl:-right-10 w-full h-full">
                            <Image src="/images/about-us/extend-team.svg" alt="Extended Team" width={500} height={370} />
                        </div>

                    </div>
                </div>
            </div>

            <div className="">

            </div>

        </section>
    )
}

export default ExtendedTeam