import Image from 'next/image';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const CommonChallanges = ({data}) => {
    const { title, description, image, items } = data;
    console.log(title, "title");
    
    return (
        <section className='sec-padding-top'>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                          
                          {/* Image */}
                          <div className="order-2 lg:order-1">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={image.width}
                              height={image.height}
                              className="max-w-full"
                            />
                          </div>
                
                          {/* Content */}
                          <div className="order-1 lg:order-2">
                          <div className="mb-6">
             <h2 className="text-secondary font-semibold leading-tight">
  {/* Line 1 */}
  {
    title?.normal && <span className="block whitespace-nowrap">
    {title?.normal }
  </span>
  }

  {/* Line 2 */}
  <span className="block whitespace-nowrap">
    {
      title?.connector && <span className="text-secondary">{title?.connector} </span>
    }
    {
      title?.highlight &&  <span className="text-primary">{title?.highlight} </span>
    }
    {
        title?.end &&  <span className="text-secondary">{title?.end }</span>
    }
   
   
  </span>
</h2>

            </div>
                
                            <p className="mb-10">{description}</p>
                
                            <ul className="space-y-3">
                              {items.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <FaCheckCircle className="text-primary mr-4 mt-1.5 w-5 text-[24px] flex-shrink-0" />
                                  <span className="text-[20px] font-semibold text-[#304C61]">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                
                        </div>
            </div>
            
        </section>
    );
};

export default CommonChallanges;