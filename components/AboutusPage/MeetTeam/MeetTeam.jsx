"use client"
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const memberImages = [
    "/images/about-us/member-03.png",
    "/images/about-us/member-01.png",
    "/images/about-us/member-02.png",
];

const MeetTeam = () => {
    const t = useTranslations("MeetTeam");
    const [activeIndex, setActiveIndex] = useState(null);

    const teamMembers = [
        { name: t("member1Name"), role: t("member1Role"), bio: t("member1Bio"), image: memberImages[0] },
        { name: t("member2Name"), role: t("member2Role"), bio: t("member2Bio"), image: memberImages[1] },
        { name: t("member3Name"), role: t("member3Role"), bio: t("member3Bio"), image: memberImages[2] },
    ];

    const handleMobileClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="sec-padding-top ">
            <div className="bg-secondary lg:pt-[90px] pt-[60px] lg:pb-[280px] md:pb-[200px] pb-[150px]">
                <div className="container">
                    <div className="text-center">
                        <h2 className="text-white">{t("heading")}</h2>
                        <p className="text-[#F8FBFF] max-w-[1171px] mx-auto pt-3 lg:pt-5">{t("intro")}</p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="-mt-[120px] md:-mt-[160px] lg:-mt-[220px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group overflow-hidden rounded-[20px] relative" onClick={() => handleMobileClick(index)}>
                                <div className="relative aspect-[4/5] w-full max-h-[493px]">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className=""
                                    />

                                    <div className={`absolute rounded-xl bottom-4 left-4 right-4 bg-white text-center p-2.5 text-text-secondary transition-opacity duration-300 group-hover:opacity-0 shadow-lg ${
                                        activeIndex === index ? "opacity-0" : "opacity-100"
                                    }`}>
                                        <h4 className="md:text-[24px] text-[20px] font-semibold">{member.name}</h4>
                                        <p className="text-gray text-[16px] font-normal">{member.role}</p>
                                    </div>

                                    <div
                                        className={`absolute inset-2 md:inset-4 rounded-xl md:rounded-[20px] bg-secondary/70 backdrop-blur-md ${
                                            activeIndex === index
                                                ? "translate-y-0 opacity-100"
                                                : "opacity-0 translate-y-[110%]"
                                        } group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out p-6 flex flex-col items-center justify-center text-center text-white border border-white/20`}
                                    >
                                        <h4 className="text-xl md:text-2xl font-bold">{member.name}</h4>
                                        <p className="text-white/80 text-sm md:text-base font-medium mb-4">{member.role}</p>
                                        <hr className="w-full border-white/20 mb-4" />
                                        <p className="text-white/90 text-[13px] md:text-base leading-relaxed line-clamp-6 md:line-clamp-none">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetTeam;
