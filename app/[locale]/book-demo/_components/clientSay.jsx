"use client"
import React, { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const testimonials = [
    {
        id: 1,
        rating: 5,
        date: "10 July 2023",
        text: "The demo was very helpful. I understood right away how CraftWise would fit into our daily routine.",
        name: "Julia K.",
        role: "Painter",
        image: "/images/testimonials/user-1.png",
    },
    {
        id: 2,
        rating: 5,
        date: "10 July 2023",
        text: "The consultant showed exactly how our team could plan jobs faster. It was short, simple, and practical.",
        name: "Markus B.",
        role: "Carpenter",
        image: "/images/testimonials/user-2.png",
    },
    {
        id: 3,
        rating: 5,
        date: "10 July 2023",
        text: "I liked that it was not a sales pitch. It was a real walkthrough focused on what we needed.",
        name: "Stefan H.",
        role: "Electrician ",
        image: "/images/testimonials/user-3.png",
    },
    {
        id: 4,
        rating: 5,
        date: "10 July 2023",
        text: "The consultant showed exactly how our team could plan jobs faster. It was short, simple, and practical.",
        name: "Markus B.",
        role: "Carpenter",
        image: "/images/testimonials/user-2.png",
    },


]

const ClientSay = () => {
    const [api, setApi] = useState(null)
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    )

    useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const scrollTo = useCallback((index) => {
        api?.scrollTo(index)
    }, [api])

    return (
        <section className="sec-padding-top sec-padding-bottom  overflow-hidden">
            <div className="container">
                <h3 className=" text-center ">
                    What Other Pros Say
                </h3>

                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnInteraction: false,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    setApi={setApi}
                >
                    <CarouselContent className="-ml-4 inner-gap">
                        {testimonials.map((testimonial) => (
                            <CarouselItem
                                key={testimonial.id}
                                className="pl-4 md:basis-1/2 lg:basis-1/3 flex"
                            >
                                <Card className="flex-1 flex flex-col min-h-full max-w-[416px] border-[#C9D6F3]/74 shadow-[0px_0px_18px_0px_#00000014] bg-white rounded-xl py-0 gap-0 overflow-hidden">
                                    <CardContent className="p-8 flex flex-col h-full">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex gap-1">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-5 h-5 fill-[#315160] text-[#315160]"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-gray-400 text-sm">
                                                {testimonial.date}
                                            </span>
                                        </div>

                                        <p className="text-[#4B5563] mb-8 flex-grow leading-relaxed">
                                            {testimonial.text}
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border">
                                                <Image
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#1F2937]">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-gray-500 text-sm">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>


                <div className="flex justify-center items-center mt-4 md:mt-10">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                "flex items-center cursor-pointer justify-center transition-all duration-300 w-6 h-6 rounded-full group",
                                current === index ? "border border-primary" : "border border-transparent"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <div
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    current === index
                                        ? "w-3 h-3 bg-primary"
                                        : "w-3 h-3 bg-[#D9D9D9] group-hover:bg-gray-400"
                                )}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ClientSay