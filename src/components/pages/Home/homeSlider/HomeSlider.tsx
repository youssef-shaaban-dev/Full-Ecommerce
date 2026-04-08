"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./homeSlider.css";
import { useTranslations, useLocale } from "next-intl";

const mainBath = "/images/banners";
const bannerImages = [
  `${mainBath}/01.jpg`,
  `${mainBath}/02.jpg`,
  `${mainBath}/03.jpg`
];

const HomeSwiper = () => {
  const t = useTranslations("home.slider");
  const locale = useLocale();

  if (!bannerImages || bannerImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
        <p className="text-gray-600 text-lg font-medium">{t("no_images")}</p>
      </div>
    );
  }

  return (
    <section className="relative w-full group">
      {/* Main Swiper Container */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          dir={locale === "ar" ? "rtl" : "ltr"}
          key={locale} // Re-mount swiper on locale change to fix direction issues
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
            renderBullet: (className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          loop
          speed={800}
          className="w-full h-full"
        >
          {bannerImages.map((img, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10"></div>

              {/* Image */}
              <Image
                src={img}
                alt={`${t("shop_view")} ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 100vw"
                priority={index === 0}
              />

              {/* Optional Content Overlay */}
              <div className="absolute bottom-8 inset-inline-start-8 z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{t("exclusive_offers")}</h3>
                <p className="text-sm md:text-base text-gray-200">{t("discover_latest")}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute start-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        <div className="swiper-button-next-custom absolute end-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2"></div>
      </div>


      {/* Decorative Elements */}
      <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"></div>

    </section>
  );
};

export default HomeSwiper;