"use client";

import { useTranslations } from "next-intl";
import TestimonialSection from "@/components/testimonial";

const avatars = [
    "/images/testimonials/about/marco-s.png",
    "/images/testimonials/about/lisa-b.png",
    "/images/testimonials/about/timo-k.png",
    "/images/testimonials/about/jana-f.png",
    "/images/testimonials/about/daniel-w.png",
    "/images/testimonials/about/sarah-m.png",
];

const TestimonialsAboutSection = () => {
    const t = useTranslations("TestimonialsAbout");

    const data = {
        title: t("title"),
        items: [
            { id: 1, rating: 5, name: t("t1Name"), role: t("t1Role"), date: t("t1Date"), text: t("t1Text"), avatar: avatars[0] },
            { id: 2, rating: 5, name: t("t2Name"), role: t("t2Role"), date: t("t2Date"), text: t("t2Text"), avatar: avatars[1] },
            { id: 3, rating: 5, name: t("t3Name"), role: t("t3Role"), date: t("t3Date"), text: t("t3Text"), avatar: avatars[2] },
            { id: 4, rating: 5, name: t("t4Name"), role: t("t4Role"), date: t("t4Date"), text: t("t4Text"), avatar: avatars[3] },
            { id: 5, rating: 5, name: t("t5Name"), role: t("t5Role"), date: t("t5Date"), text: t("t5Text"), avatar: avatars[4] },
            { id: 6, rating: 5, name: t("t6Name"), role: t("t6Role"), date: t("t6Date"), text: t("t6Text"), avatar: avatars[5] },
        ],
    };

    return <TestimonialSection data={data} />;
};

export default TestimonialsAboutSection;
