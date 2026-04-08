"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { RiLinkedinLine } from "react-icons/ri";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const TeamSwiper = () => {
  const t = useTranslations("about.team");
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const teamMembers = [
    {
      name: "Tom Cruise",
      role: t("founder"),
      image: "/images/TeamMemebers/mem1.png",
      socials: { X: "#", insta: "#", linkedin: "#" },
    },
    {
      name: "Emma Watson",
      role: t("director"),
      image: "/images/TeamMemebers/mem3.png",
      socials: { X: "#", insta: "#", linkedin: "#" },
    },
    {
      name: "Will Smith",
      role: t("designer"),
      image: "/images/TeamMemebers/mem2.png",
      socials: { X: "#", insta: "#", linkedin: "#" },
    },
    {
      name: "Tom Cruise",
      role: t("founder"),
      image: "/images/TeamMemebers/mem1.png",
      socials: { X: "#", insta: "#", linkedin: "#" },
    },
    {
      name: "Emma Watson",
      role: t("director"),
      image: "/images/TeamMemebers/mem3.png",
      socials: { X: "#", insta: "#", linkedin: "#" },
    },
    {
      name: "Will Smith",
      role: t("designer"),
      image: "/images/TeamMemebers/mem2.png",
      socials: { X: "#", insta: "#", linkedin: "#" },
    },
  ];

  return (
    <div className="w-[90%] mx-auto my-12 relative">
      <Swiper
        dir={isRtl ? "rtl" : "ltr"}
        key={locale}
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
          el: ".swiper-pagination",
        }}
        className="pb-12"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-6 p-4">
              <div className="bg-slate-100 rounded-lg overflow-hidden h-[400px] relative transition-transform duration-500 hover:scale-[1.02] group">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain pt-8 px-8 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
                <p className="text-slate-600 font-medium">{member.role}</p>
                <div className="flex gap-4 mt-2 text-2xl">
                  <a href={member.socials.X} className="hover:text-primary-red transition-colors duration-300">
                    <CiTwitter />
                  </a>
                  <a href={member.socials.insta} className="hover:text-primary-red transition-colors duration-300">
                    <IoLogoInstagram />
                  </a>
                  <a href={member.socials.linkedin} className="hover:text-primary-red transition-colors duration-300">
                    <RiLinkedinLine />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-pagination mt-8!"></div>

      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          display: flex;
          justify-content: center;
        }

        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #cbd5e1 !important;
          opacity: 1 !important;
          transition: all 0.3s ease;
          margin: 0 6px !important;
          border-radius: 50%;
        }

        .swiper-pagination-bullet-active {
          background-color: var(--color-primary-red) !important;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(219, 68, 68, 0.3);
        }
      `}</style>
    </div>
  );
};


export default TeamSwiper;
