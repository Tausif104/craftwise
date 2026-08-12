import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
    {
        title: "Product Updates",
        description: "New feature announcements, improvements, and upcoming releases.",
        icon: "/images/news/category-01.svg",
        link: "/news/category/product-updates"
    },
    {
        title: "Educational Content",
        description: "Guides, how-tos, and productivity tips to help your team work smarter.",
        icon: "/images/news/category-02.svg",
        link: "/news/category/educational-content"
    },
    {
        title: "Industry Insights",
        description: "Market trends, digital transformation stories, and thought-leadership articles for craft professionals.",
        icon: "/images/news/category-03.svg",
        link: "/news/category/industry-insights"
    }
]

const BrowseCategory = () => {
    return (
        <section className="sec-padding-top ">
            <div className="container">
                <div className="">
                    <h3 className="text-center font-bold">
                        Browse by Category
                    </h3>
                </div>
                <div className="inner-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 md:p-10 rounded-[16px] shadow-[0px_0px_18px_0px_#00000014] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0px_10px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1 group"
                        >
                            <div className="w-20 h-20 rounded-full bg-[#C886401A] flex items-center justify-center mb-8 shrink-0">
                                <Image
                                    src={category.icon}
                                    alt={category.title}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <h4 className=" mb-3">
                                {category.title}
                            </h4>
                            <p className="text-[#393E41] text-[15px] md:text-[16px] leading-relaxed mb-3 md:mb-5 flex-grow">
                                {category.description}
                            </p>
                            <Link
                                href={category.link}
                                className="inline-flex items-center gap-2 text-[#C88640] font-bold transition-all hover:gap-3 underline-offset-4"
                            >
                                View
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BrowseCategory