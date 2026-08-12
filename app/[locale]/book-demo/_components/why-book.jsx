import Image from "next/image";

const CARDS = [
    { img: "/images/book-demo/demo-question.svg", titleKey: "card1Title", textKey: "card1Text" },
    { img: "/images/book-demo/adapted.svg",       titleKey: "card2Title", textKey: "card2Text" },
    { img: "/images/book-demo/real-product.svg",  titleKey: "card3Title", textKey: "card3Text" },
    { img: "/images/book-demo/free.svg",          titleKey: "card4Title", textKey: "card4Text" },
];

const WhyBook = ({ heading, cards }) => {
    return (
        <div className="sec-padding-top">
            <div className="container">
                <h3 className="text-center">{heading}</h3>
                <div className="inner-gap grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-6">
                    {CARDS.map(({ img, titleKey, textKey }) => (
                        <div key={titleKey} className="flex items-center md:gap-6 gap-3 p-4 md:p-7 shadow-[0px_0px_18px_0px_#00000014] rounded-xl hover:shadow-[0px_0px_18px_0px_#00000014] transition-all duration-300 hover:scale-105">
                            <div className="relative flex items-center justify-center bg-primary/14 rounded-full p-6 w-[100px] h-[100px] h-fit">
                                <Image src={img} alt={cards[titleKey]} height={60} width={60} className="object-contain" />
                            </div>
                            <div className="md:space-y-3 space-y-2 max-w-[462px]">
                                <h4>{cards[titleKey]}</h4>
                                <p>{cards[textKey]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyBook;