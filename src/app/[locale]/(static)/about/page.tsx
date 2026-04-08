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
    <div className="my-24 mx-auto w-[80%] flex flex-col gap-5">
      <PathLinks titles={[t("title")]} />
      <div className="flex justify-end gap-10 relative inset-inline-start-[130px] custom-mid:inset-inline-start-0 custom-mid:gap-5">
        <div className="flex flex-col gap-4 w-[500px] mt-16 custom-handling:text-center">
          <h1 className="text-4xl">{t("story.title")}</h1>
          <p>
            {t("story.para1")}
          </p>
          <p>
            {t("story.para2")}
          </p>
        </div>
        <div>
          <Image
            src="/images/aboutImg.png"
            alt="About img"
            width={1000}
            height={100}
            className="w-[800px] h-[500px] object-cover custom-handling:hidden"
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
