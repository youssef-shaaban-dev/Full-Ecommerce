"use client";

import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type SimpleSliderProps = {
    children: React.ReactNode;
    spaceBetween?: number;
};

const FlashSlider: React.FC<SimpleSliderProps> = ({
    children,
    spaceBetween = 20,
}) => {
    const locale = useLocale();

    return (
        <div className="relative">
            {/* Slider */}
            <Swiper
                modules={[Navigation]}
                dir={locale === "ar" ? "rtl" : "ltr"}
                key={locale}
                navigation={{
                    nextEl: ".flash-next",
                    prevEl: ".flash-prev",
                }}

                spaceBetween={spaceBetween}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                    },
                }}
                className="pb-10"
            >
                {Array.isArray(children)
                    ? children.map((child, index) => (
                        <SwiperSlide key={index}>{child}</SwiperSlide>
                    ))
                    : children}
            </Swiper>
        </div>
    );
};

export default FlashSlider;
