import Image from "next/image";
import { FaTimesCircle, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const ChallengeSolution = ({ data }) => {
  const { title, challenge, solution } = data;

  return (
    <section className="sec-padding-top">
      <div className="container mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-secondary">
            {title.normal}{" "}
            <span className="text-primary">{title.highlight}</span>
          </h2>
        </div>

        {/* Wrapper */}
        <div className="relative border border-[#C8DEF7] rounded-2xl overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Challenge */}
            <div className="px-[30px] py-[30px] bg-[#F8FBFF]">
              <div className="flex items-center mb-6 gap-2.5">
                 <Image src="/images/icons/f_challange.svg" alt="solution" width={64} height={64}/>
                <h4 className="font-bold text-[28px] text-[#0A1B28]">
                  {challenge.title}
                </h4>
              </div>

              <ul className="space-y-4">
                {challenge.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaTimesCircle className="text-red-500 mr-3 mt-2 w-6 flex-shrink-0" />
                    <span className="text-[#393E41] text-[20px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            
            <div className="px-10 lg:pl-[70px] lg:pr-[40px] py-6 lg:py-[30px] bg-[#F8FBFF] border-t lg:border-t-0 lg:border-l border-[#CCE1FC]">
              <div className="flex items-center mb-6 gap-2.5">
                <Image src="/images/icons/f_solution.svg" alt="solution" width={64} height={64}/>
                <h4 className="font-bold text-[28px] text-[#0A1B28]">
                  {solution.title}
                </h4>
              </div>

              <ul className="space-y-4">
                {solution.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-[#34C759] mr-3 mt-2 w-6 flex-shrink-0" />
                    <span className="text-[#393E41] text-[20px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Center Arrow */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  px-2">
            <Image src="/images/icons/gradient-arrow.svg" alt="arrow" width={60} height={30}/>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChallengeSolution;