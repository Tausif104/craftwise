import Image from "next/image";
import SecondaryBtn from "./SecondaryBtn";

const CommonCard = ({ icon, title, description, subtitle, buttonLabel, buttonLink }) => {
    const isImagePath = typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http'));

    return (
        <div className="flex flex-col items-center text-center rounded-[16px] p-4 md:p-7.5 shadow-[0px_0px_18px_0px_#00000014] h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full bg-primary/14 flex items-center justify-center shrink-0">
                {isImagePath ? (
                    <div className="relative w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                        <Image src={icon} alt={title} fill className="object-contain" />
                    </div>
                ) : (
                    <span className="text-[24px] md:text-[40px] font-bold text-primary">{icon}</span>
                )}
            </div>
            <h4 className="pt-[20px] lg:pt-[28px] text-text-secondary">{title}</h4>
            <p className="pt-2.5 md:pt-3.5 flex-grow">{description}</p>
            {subtitle && <h4 className="pt-2.5 md:pt-3.5 text-[#181818] font-medium text-xl md:text-2xl mb-2">{subtitle}</h4>}
            {buttonLabel && <div className="mt-4"><SecondaryBtn text={buttonLabel} link={buttonLink} /></div>}
        </div>
    );
};

export default CommonCard;
