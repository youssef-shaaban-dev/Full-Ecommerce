import PathLinks from "@/components/common/PathLinks";
import React from "react";
import Statistics from "./Statistics/Statistics";
import TeamSwiper from "./Swiper/TeamSwiper";
import Services from "@/components/pages/Home/Services/Services";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  
  return (
    <div className="my-12 md:my-24 container mx-auto px-4 flex flex-col gap-16">
      <PathLinks titles={[t("title")]} />
      
      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center overflow-hidden">
        <div className="flex flex-col gap-6 order-2 md:order-1 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{t("story.title")}</h1>
          <div className="flex flex-col gap-4 text-base md:text-lg leading-relaxed text-slate-700">
            <p>{t("story.para1")}</p>
            <p>{t("story.para2")}</p>
          </div>
        </div>
        
        <div className="order-1 md:order-2">
          <Image
            src="/images/aboutImg.png"
            alt="Exclusive Our Story"
            width={1000}
            height={600}
            priority
            className="w-full h-auto object-cover rounded-sm shadow-xl"
          />
        </div>
      </div>

      <div className="py-10">
        <Statistics />
      </div>
      <div>
        <TeamSwiper />
      </div>
      <div className="pb-10">
        <Services />
      </div>
    </div>
  );
};


export default AboutPage;
