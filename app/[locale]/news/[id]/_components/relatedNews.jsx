import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"

const articles = [

    {
        id: 4,
        image: "/images/news/news-01.svg",
        tag: "Product Update – March 2025",
        title: "Custom Job Addresses & Secure Cancel Invoices",
        description: "You can now set specific job addresses and issue cancellation invoices that comply with legal requirements.",
        link: "#"
    },
    {
        id: 5,
        image: "/images/news/news-01.svg",
        tag: "Product Update – February 2025",
        title: "Use Catalog Items Directly in Reports",
        description: "Materials and services from your catalog can now be inserted into reports instantly without extra steps.",
        link: "#"
    },
    {
        id: 6,
        image: "/images/news/news-01.svg",
        tag: "Product Update – January 2025",
        title: "Signatures via Email for Reports",
        description: "Clients can now sign reports by email, reducing paperwork and speeding up job closeouts.",
        link: "#"
    }
]

const RelatedNews = () => {
    return (
        <section className="sec-padding-top sec-padding-bottom">
            <div className="container">
                <div className="">
                    <h2 className=" text-center">
                        Related News
                    </h2>

                    <div className="inner-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {articles.map((article) => (
                            <div
                                key={article.id}
                                className="bg-white rounded-[16px] border border-[#1A1A1A1A] overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.08)] shadow-[0px_0px_18px_0px_#00000014]"
                            >

                                <div className="p-4">
                                    <div className="relative aspect-[3/2] rounded-[12px] overflow-hidden bg-[#F8F9FA] flex items-center justify-center border border-[#1A1A1A1A]">
                                        {article.image ? (
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                                <ImageIcon size={48} strokeWidth={1.5} />
                                            </div>
                                        )}
                                    </div>
                                </div>


                                <div className="p-6 pt-2 flex flex-col flex-grow">
                                    <span className="text-[14px] text-[#5C5E5E] mb-3">
                                        {article.tag}
                                    </span>
                                    <h4 className="text-[20px] font-bold text-text-secondary mb-3 leading-tight">
                                        {article.title}
                                    </h4>
                                    <p className=" text-[16px] leading-relaxed mb-4 md:mb-6 flex-grow line-clamp-2">
                                        {article.description}
                                    </p>
                                    <Link
                                        href={`/news/${article.id}`}
                                        className="inline-flex items-center gap-2 text-primary font-semibold text-[16px] transition-all hover:gap-3"
                                    >
                                        Learn More
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </section>
    );
};

export default RelatedNews;