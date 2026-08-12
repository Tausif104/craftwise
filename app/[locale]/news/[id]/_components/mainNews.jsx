import Image from "next/image"

const MianNews = () => {
    return (
        <section className="">
            <div className="container px-4 md:px-6">
                <div className="max-w-[1094px] mx-auto">

                    <div className="mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-[36px] font-bold mb-6 leading-tight max-w-[879px]">
                            Custom Job Addresses & Secure Cancel Invoices: Streamlining Your Workflow
                        </h2>
                        <p className="text-[#393E41] leading-relaxed mb-6 md:mb-10 max-w-[914px] text-sm md:text-base">
                            In today's fast-paced business environment, managing multiple jobs, clients, and invoices can be challenging.
                            Two features that can significantly improve efficiency and security for any business are custom job addresses
                            and secure cancel invoices.
                        </p>
                        <div className="relative w-full aspect-[16/9] md:aspect-[21/10] rounded-[20px] overflow-hidden">
                            <Image
                                src="/images/news/news-2.png"
                                alt="Professionals working on-site"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div className="mb-8 md:mb-12">
                        <h3 className="text-xl md:text-[36px] font-bold mb-4 max-w-[879px]">
                            Custom Job Addresses: Flexibility for Every Task
                        </h3>
                        <p className="leading-relaxed mb-6 text-sm md:text-base">
                            Whether you're managing on-site services, deliveries, or client visits, being able to assign custom addresses
                            for each job makes planning and execution seamless. Instead of relying solely on a client's main address,
                            businesses can now:
                        </p>
                        <ol className="list-decimal pl-5 space-y-3 text-[#393E41] mb-6 font-semibold text-sm md:text-base">
                            <li>Set specific addresses for individual tasks or projects.</li>
                            <li>Track service locations accurately.</li>
                            <li>Reduce confusion and improve scheduling efficiency.</li>
                        </ol>
                        <p className="leading-relaxed text-sm md:text-base">
                            This flexibility ensures that your team spends less time figuring out locations and more time delivering exceptional service.
                        </p>
                    </div>

                    <div className="mb-8 md:mb-12">
                        <h3 className="text-xl md:text-[36px] font-bold mb-4">
                            Secure Cancel Invoices: Peace of Mind for Every Transaction
                        </h3>
                        <p className="leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                            Mistakes happen, and sometimes an invoice needs to be canceled. Secure cancel invoices provide a safe,
                            reliable way to manage these situations without risking financial discrepancies or client trust.
                            Key benefits include:
                        </p>
                        <div className="bg-[#F9FAFB] p-6 md:p-8 rounded-xl">
                            <ul className="space-y-4 text-[#393E41] text-sm md:text-base">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#393E41] shrink-0" />
                                    <span>Instant cancellations with proper authorization.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#393E41] shrink-0" />
                                    <span>Audit trails for compliance and transparency.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#393E41] shrink-0" />
                                    <span>Protection against accidental deletions or misuse.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center mb-12 md:mb-20">
                        <div className="order-2 md:order-1">
                            <h3 className="text-xl md:text-[36px] font-bold mb-4 md:mb-6">
                                Why These Features Matter
                            </h3>
                            <p className="leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                                Integrating custom job addresses and secure invoice cancellation into your workflow not only improves
                                operational efficiency but also enhances client trust. Accurate location management and secure financial
                                controls are no longer optional—they're essential for businesses that want to scale smoothly and professionally.
                            </p>
                            <ul className="space-y-4 md:space-y-6 text-[#393E41] text-sm md:text-base">
                                <li className="flex items-start gap-4">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                    <p>
                                        <span className="font-bold text-[#0A1B28]">Controlled Access:</span> Only authorized team members can cancel invoices,
                                        reducing the risk of fraud or accidental deletion.
                                    </p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                    <p>
                                        <span className="font-bold text-[#0A1B28]">Detailed Audit Trail:</span> Every canceled invoice is logged with time,
                                        date, and reason, keeping your financial records transparent and compliant.
                                    </p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                                    <p>
                                        <span className="font-bold text-[#0A1B28]">Client Confidence:</span> When clients see that errors are handled quickly
                                        and securely, trust in your business increases.
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="relative w-full aspect-[16/9] md:aspect-[5/4] rounded-[20px] overflow-hidden order-1 md:order-2">
                            <Image
                                src="/images/news/news-1.png"
                                alt="Team meeting in office"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-12 md:mt-20">
                        <h2 className="text-2xl md:text-[36px] font-bold mb-6 leading-tight max-w-[879px]">
                            Custom Job Addresses & Secure Cancel Invoices: Streamlining Your Business Operations
                        </h2>
                        <p className="leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                            Running a business often means juggling multiple tasks, clients, and locations. Managing this efficiently can be tricky,
                            but with features like custom job addresses and secure cancel invoices, your workflow becomes smoother, safer, and
                            more professional.
                        </p>

                        <h3 className="text-xl md:text-[36px] font-bold mb-4 max-w-[879px]">
                            Custom Job Addresses: Tailored for Every Job
                        </h3>
                        <p className="leading-relaxed mb-6 text-sm md:text-base">
                            Not every job takes place at the same location. With the ability to assign custom addresses to each job,
                            businesses gain flexibility and accuracy in their operations. Here's how this feature helps:
                        </p>
                        <ul className="space-y-4 text-[#393E41] mb-8 md:mb-10 text-sm md:text-base">
                            <li className=" gap-2">
                                <span className="font-bold shrink-0">• Precise Planning:</span>
                                <span>Assign exact locations for every project or client visit to prevent confusion or missed appointments.</span>
                            </li>

                            <li className=" gap-2">
                                <span className="font-bold shrink-0">• Enhanced Client Experience:</span>
                                <span>Clients appreciate when service providers arrive on time at the correct location, improving satisfaction and trust.</span>
                            </li>
                            <li className=" gap-2">
                                <span className="font-bold shrink-0">• Efficiency Boost:</span>
                                <span>Reduce wasted time and optimize routes when managing multiple job sites in a day.</span>
                            </li>
                        </ul>

                        <div className="relative w-full aspect-[16/9] md:aspect-[3/1] rounded-[20px] overflow-hidden mb-8 md:mb-12">
                            <Image
                                src="/images/news/news-3.png"
                                alt="Working on laptop"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <h3 className="text-xl md:text-[36px] font-bold mb-4 md:mb-6 max-w-[879px]">
                            Why These Features Are Essential
                        </h3>
                        <p className="leading-relaxed mb-6 text-sm md:text-base">
                            Integrating custom job addresses and secure invoice cancellation into your daily operations has a direct impact on
                            business efficiency and client satisfaction:
                        </p>
                        <ul className="space-y-4 text-[#393E41] mb-8 md:mb-12 text-sm md:text-base">
                            <li className=" gap-2">
                                <span className="font-bold shrink-0">• Reduce Operational Errors:</span>
                                <span>Less confusion about locations or invoice mistakes means smoother day-to-day operations.</span>
                            </li>
                            <li className=" gap-2">
                                <span className="font-bold shrink-0">• Save Time:</span>
                                <span>Automation of addresses and invoice management frees up your team to focus on delivering high-quality service.</span>
                            </li>
                            <li className=" gap-2">
                                <span className="font-bold shrink-0">• Boost Professionalism:</span>
                                <span>Accurate, transparent, and secure processes enhance your brand's reputation.</span>
                            </li>
                            <li className=" gap-2">
                                <span className="font-bold shrink-0">• Support Growth:</span>
                                <span>Scalable processes mean you can handle more clients and projects without increasing errors.</span>
                            </li>
                        </ul>

                        <h2 className="text-2xl md:text-[36px] font-bold mb-4 md:mb-6 max-w-[879px]">
                            Conclusion
                        </h2>
                        <div className="space-y-4 md:space-y-6 leading-relaxed text-sm md:text-base">
                            <p>
                                Incorporating custom job addresses and secure cancel invoices into your business operations isn't just a
                                convenience—it's a game-changer. These features streamline workflows, reduce errors, and enhance client trust,
                                allowing your team to focus on delivering exceptional service.
                            </p>
                            <p>
                                By ensuring every job is accurately tracked and every invoice is securely managed, businesses can operate more
                                efficiently, maintain professionalism, and scale with confidence. Embracing these tools today sets the foundation
                                for a smoother, more reliable, and client-focused future.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MianNews