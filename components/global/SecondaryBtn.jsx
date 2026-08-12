import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import React from "react";
import { normalizeLocalizedHref } from "@/lib/normalize-localized-href";

const SecondaryBtn = ({ text, icon: Icon = ArrowRight, link = "#" }) => {
    const isExternal = typeof link === "string" && /^(mailto:|tel:|https?:)/.test(link);

    if (isExternal) {
        return (
            <a href={link} className="secondary-btn flex items-center justify-center gap-2 w-full md:w-fit">
                <span>{text}</span>
                {Icon && <Icon size={20} />}
            </a>
        );
    }

    return (
        <Link href={normalizeLocalizedHref(link)} className="secondary-btn flex items-center justify-center gap-2 w-full md:w-fit">
            <span>{text}</span>
            {Icon && <Icon size={20} />}
        </Link>
    );
};

export default SecondaryBtn;

