"use client"
import React, { useState } from "react";
import CommonCardTwo from "./global/common-card-two";
import CommonCardTwoTab from "./global/common-card-two-tab";

const TradesWeSupport = ({ heading, subtext, learnMore, trades = [] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="sec-padding-top sec-padding-bottom bg-[#F8FBFF]">
      <div className="container">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-center mb-8">{heading}</h2>
          <p className="text-center">{subtext}</p>
        </div>
        <div className="inner-gap hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 pb-8">
          {trades.map((item, index) => (
            <CommonCardTwo
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              link={item.link}
              linkText={learnMore}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="relative lg:hidden mb-3 mt-8">
          <div className="navigation">
            <ul>
              {trades.map((item, index) => (
                <li
                  key={index}
                  className={`list ${activeTab === index ? "active" : ""}`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="a">
                    <span className="icon">
                      <img
                        src={item.svg}
                        alt={item.title}
                        className="w-8 h-8 transition-all duration-300"
                      />
                    </span>
                  </div>
                </li>
              ))}
              <div className="indicator"></div>
            </ul>
          </div>
        </div>

        <div className="tab-content lg:hidden">
          {trades[activeTab] && (
            <CommonCardTwoTab
              icon={trades[activeTab].icon}
              title={trades[activeTab].title}
              description={trades[activeTab].description}
              link={trades[activeTab].link}
              linkText={learnMore}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TradesWeSupport;
