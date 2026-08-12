'use client';
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import PrimaryBtn from "@/components/global/primary-btn";
import { useTranslations } from 'next-intl';

const NextStep = () => {
    const t = useTranslations('NextStep');

    return (
        <section className="sec-padding-top">
            <div className="bg-secondary lg:py-[60px] py-[50px] overflow-hidden">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="text-white space-y-6">
                            <h3 className="text-white">{t('heading')}</h3>
                            <p className="text-base md:text-lg text-white opacity-70 max-w-[500px]">
                                {t('body')}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <PrimaryBtn text={t('primaryCta')} link="/book-demo" />
                                <Link
                                    href="/book-demo"
                                    className="border border-primary hover:bg-primary text-white px-6 md:px-8 py-3.5 rounded-full flex items-center gap-2 font-medium transition-all"
                                >
                                    {t('secondaryCta')} <MoveRight size={20} />
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-[300px] md:h-[400px] lg:h-[450px]">
                            <Image
                                src="/images/pricing/next-step.svg"
                                alt={t('heading')}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NextStep;
