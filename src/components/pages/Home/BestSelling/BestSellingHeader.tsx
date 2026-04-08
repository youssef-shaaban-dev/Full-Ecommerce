'use client';
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const BestSellingHeader = () => {
    const t = useTranslations("home.best_selling");
    return (
        <div >
            {/* Section Header */}
            <div className="flex items-center gap-5">
                <Badge variant="secondary"></Badge>
                <p className="text-sm font-bold align-middle">{t("badge")}</p>
            </div>

            {/* category */}
            <div className="flex justify-between items-center my-5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {t("title")}
                </h1>
            </div>
        </div>
    );
};


export default BestSellingHeader;
