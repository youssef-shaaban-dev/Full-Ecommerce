"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type SimpleSliderProps = {
    children: React.ReactNode;
    spaceBetween?: number;
};

import { useLocale } from "next-intl";

const CategorySlider: React.FC<SimpleSliderProps> = ({
    children,
    spaceBetween = 20,
}) => {
    const locale = useLocale();
    const isRtl = locale === 'ar';

    return (
        <div className="relative">
            {/* Slider */}
            <Swiper
                dir={isRtl ? "rtl" : "ltr"}
                key={locale} // Force re-render on locale change
                modules={[Navigation]}
                navigation={{
                    nextEl: ".cat-next",
                    prevEl: ".cat-prev",
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
                        slidesPerView: 4,
                    },
                    1280: {
                        slidesPerView: 5,
                    },
                }}
                className="pb-10"
            >
                {Array.isArray(children)
                    ? children.map((child, index) => (
                        <SwiperSlide className="!w-80 md:!w-58" key={index}>{child}</SwiperSlide>
                    ))
                    : children}
            </Swiper>
        </div>
    );
};


export default CategorySlider;
