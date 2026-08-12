import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const Cta = () => {
    const t = useTranslations("LandingPage.footerCta");

    return (
        <section className="">
            <div className="bg-secondary py-[50px] md:py-[70px]">
                <div>
                    <h2 className="text-center text-white">
                        {t("heading")}
                    </h2>
                    <p className="text-[20px] text-center pt-4 text-white opacity-70 max-w-[600px] px-5 md:px-0 w-full mx-auto">
                        {t("body")}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-7 lg:pt-10">
                        <Link
                            href="/registration"
                            className="cursor-pointer inline-flex gap-2 items-center bg-primary text-white px-8 py-3.5 rounded-full font-semibold transition-opacity hover:opacity-90"
                        >
                            {t("primaryButton")} <ArrowRight height={20} width={20} strokeWidth={2.5} />
                        </Link>
                        <Link
                            href="/book-demo"
                            className="cursor-pointer inline-flex gap-2 items-center border-2 border-primary text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-primary"
                        >
                            {t("secondaryButton")} <ArrowRight height={20} width={20} strokeWidth={2.5} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;
