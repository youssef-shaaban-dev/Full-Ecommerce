'use client';
import { Badge } from "@/components/ui/badge";
import Countdown from "./Countdown";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FlashSalesHeader = () => {
    const t = useTranslations("home.flash_sales");
    return (
        <div >
            {/* Section Header */}
            <div className="flex items-center gap-5">
                <Badge variant="secondary"></Badge>
                <p className="text-sm font-bold align-middle">{t("badge")}</p>
            </div>

            {/* Title, Countdown and Navigation */}
            <div className="flex justify-between items-end my-5 flex-wrap gap-6">
                <div className="flex items-end gap-10 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        {t("title")}
                    </h1>
                    <Countdown targetDate="2025-08-25 23:59:59" />
                </div>

                {/* Navigation Buttons for Flash Slider */}
                <div className="flex gap-2 pb-2">
                    <button className="flash-prev w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50">
                        <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                    <button className="flash-next w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50">
                        <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default FlashSalesHeader;
