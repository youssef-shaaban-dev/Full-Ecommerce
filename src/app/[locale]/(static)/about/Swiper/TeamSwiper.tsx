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

const teamMembers = [
  {
    name: "Tom Cruise",
    role: "Founder & chairman",
    image: "/images/TeamMemebers/mem1.png",
    socials: { X: "#", insta: "#", linkedin: "#" },
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    image: "/images/TeamMemebers/mem3.png",
    socials: { X: "#", insta: "#", linkedin: "#" },
  },
  {
    name: "Will Smith",
    role: "Product designer",
    image: "/images/TeamMemebers/mem2.png",
    socials: { X: "#", insta: "#", linkedin: "#" },
  },
  {
    name: "Tom Cruise",
    role: "Founder & chairman",
    image: "/images/TeamMemebers/mem1.png",
    socials: { X: "#", insta: "#", linkedin: "#" },
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    image: "/images/TeamMemebers/mem3.png",
    socials: { X: "#", insta: "#", linkedin: "#" },
  },
  {
    name: "Will Smith",
    role: "Product designer",
    image: "/images/TeamMemebers/mem2.png",
    socials: { X: "#", insta: "#", linkedin: "#" },
  },
];

const TeamSwiper = () => {
  return (
    <div className="w-[90%] mx-auto my-12 relative">
      <Swiper
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
            <div>
              <Image
                src={member.image}
                alt="team member img"
                width={1000}
                height={100}
                className="h-[350px] bg-slate-100 pt-5 px-12"
              />
              <div className="flex flex-col justify-end  p-2">
                <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
                <div className="flex  gap-3 mt-3 text-xl">
                  <a href={member.socials.X}>
                    <CiTwitter />
                  </a>
                  <a href={member.socials.insta}>
                    <IoLogoInstagram />
                  </a>
                  <a href={member.socials.linkedin}>
                    <RiLinkedinLine />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-pagination mt-4"></div>

      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background-color: gray !important;
          opacity: 0.5 !important;
          transition: all 0.3s ease;
          margin: 0 5px !important;
          border-radius: 50%;
        }

        .swiper-pagination-bullet-active {
          background-color: #ff4500 !important;
          opacity: 1 !important;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default TeamSwiper;
