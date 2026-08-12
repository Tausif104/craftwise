import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { normalizeLocalizedHref } from "@/lib/normalize-localized-href";

const CommonCardTwoTab = ({ icon, title, description, link, linkText = 'Learn More' }) => {
    const isImagePath = typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http'));

    return (
        <div className="flex flex-col items-center text-center rounded-[16px] bg-white p-4 md:p-7.5  h-full transition-all duration-300 ">
            <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full  shrink-0">
                {isImagePath ? (
                    <div className="relative w-full">
                        <Image src={icon} alt={title} width={110} height={110} className="object-cover" />
                    </div>
                ) : (
                    <span className="text-[24px] md:text-[40px] font-bold text-primary">{icon}</span>
                )}
            </div>
            <h4 className="pt-[20px] lg:pt-[28px] text-text-secondary">{title}</h4>
            <p className="pt-2.5 md:pt-3.5 flex-grow">{description}</p>
            {link && (
                <Link href={normalizeLocalizedHref(link)} className="pt-2.5 md:pt-3.5 flex-grow text-primary font-semibold">{linkText} <ArrowRight className="inline-block w-5" /></Link>
            )}
        </div>
    );
};

export default CommonCardTwoTab;
