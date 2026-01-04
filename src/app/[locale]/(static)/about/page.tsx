import PathLinks from "@/components/common/PathLinks";
import React from "react";
import Statistics from "./Statistics/Statistics";
import TeamSwiper from "./Swiper/TeamSwiper";
import Services from "@/components/pages/Home/Services/Services";
import Image from "next/image";
const AboutPage = () => {
  return (
    <div className="my-24 mx-auto w-[80%] flex flex-col gap-5">
      <PathLinks titles={["About"]} />
      <div className="flex justify-end gap-10 relative left-[130px] custom-mid:left-0 custom-mid:gap-5">
        <div className="flex flex-col gap-4 w-[500px] mt-16 custom-handling:text-center">
          <h1 className="text-4xl">Our Story</h1>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div>
          <Image
            src="/images/aboutImg.png"
            alt="About img"
            width={1000}
            height={100}
            className="w-[800px] h-[500px]  custom-handling:hidden"
          />
        </div>
      </div>

      <div className="mt-10 ">
        <Statistics />
      </div>
      <div className="my-4">
        <TeamSwiper />
      </div>
      <div className="my-5">
        <Services />
      </div>
    </div>
  );
};

export default AboutPage;
