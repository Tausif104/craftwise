import { Clock, User } from "lucide-react"
import Image from "next/image"

const Hero = () => {
    return (
        <section className="pt-[160px] md:pt-[112px] xl:pt-[160px] pb-10 md:pb-20">
            <div className="container">
                <div className="max-w-[700px] mx-auto text-center mb-8 md:mb-12">
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6 text-sm text-[#0A1B28]">
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span>13 February 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            <span className="flex items-center gap-1">By <span>CRAFTWISE</span></span>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-[56px] font-extrabold text-text-secondary mb-4 md:mb-6 leading-tight px-4 md:px-0">
                        Custom Job Addresses & Secure Cancel Invoices
                    </h1>
                    <p className="max-w-[500px] mx-auto text-sm md:text-base  px-4 md:px-0">
                        You can now set specific job addresses and issue cancellation invoices that comply with legal requirements.
                    </p>
                </div>

                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[14px] overflow-hidden shadow-sm">
                    <Image
                        src="/images/news/news-hero.png"
                        alt="News Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero