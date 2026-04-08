'use client';
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryHeader = () => {
    const t = useTranslations("home.categories");
    return (
        <div >
            {/* Section Header */}
            <div className="flex items-center gap-5">
                <Badge variant="secondary"></Badge>
                <p className="text-sm font-bold align-middle">{t("badge")}</p>
            </div>

            {/* Title & Navigation */}
            <div className="flex justify-between items-end my-5 flex-wrap gap-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {t("title")}
                </h1>

                {/* Navigation Buttons for Category Slider */}
                <div className="flex gap-2 pb-2">
                    <button className="cat-prev w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50">
                        <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                    <button className="cat-next w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50">
                        <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default CategoryHeader;
