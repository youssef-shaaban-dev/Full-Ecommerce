"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

const MusicSection = () => {
  const t = useTranslations("home.music_experience");

  const TimerData = [
    { value: "23", label: t("timer.hours") },
    { value: "05", label: t("timer.days") },
    { value: "59", label: t("timer.minutes") },
    { value: "35", label: t("timer.seconds") }
  ];

  return (
    <section className="bg-linear-to-br from-slate-950 to-slate-900 mb-6 min-h-[400px] flex flex-col lg:flex-row justify-between items-center p-4 sm:p-6 md:p-8 lg:p-11 rounded-2xl shadow-2xl border border-slate-800">

      {/* Content Section */}
      <div className="flex flex-col w-full lg:w-1/2 gap-4 md:gap-6 mb-6 lg:mb-0 lg:pr-8">
        <p className="text-[#81c39b] text-lg sm:text-xl md:text-2xl font-medium tracking-wide">
          {t("subtitle")}
        </p>

        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
          {t("title")}
        </h2>

        {/* Timer Circles */}
        <div className="flex flex-wrap gap-3 md:gap-4 text-black">
          {TimerData.map((timer, index) => (
            <div
              key={index}
              className="bg-linear-to-b from-white to-slate-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full flex flex-col justify-center items-center font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="text-lg sm:text-xl font-extrabold">{timer.value}</span>
              <span className="text-[8px] sm:text-[10px] text-gray-600 -mt-1">{timer.label}</span>
            </div>
          ))}
        </div>

        {/* Buy Button */}
        <Button className="bg-linear-to-r from-[#00FF66] to-[#00e65a] hover:from-[#00e65a] hover:to-[#00d451] text-black font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-fit min-w-[140px] sm:min-w-[160px]">
          <span className="text-sm sm:text-base">{t("buy_now")}</span>
        </Button>
      </div>


      {/* Image Section */}
      <div className="relative flex justify-center items-center w-full lg:w-1/2 h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF66]/20 to-transparent rounded-full blur-3xl"></div>
        <Image
          src="/images/Dj.png"
          alt="Music category - DJ headphones"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
          quality={100}
          priority
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 z-10 relative"
        />
      </div>
    </section>
  );
};

export default MusicSection;