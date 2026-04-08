import { Link } from "@/i18n/routing";
import Image from "next/image";

interface FeatureCardProps {
    title: string;
    description: string;
    img: string;
    alt: string;
    gradient: string;
    effect: string;
    textGradient: string;
    linkColor: string;
    imgWidth: number;
    imgHeight: number;
    size?: string;
}
import { useTranslations } from "next-intl";

export const FeatureCard = ({
    title,
    description,
    img,
    alt,
    gradient,
    effect,
    textGradient,
    linkColor,
    imgWidth,
    imgHeight,
    size,
}: FeatureCardProps) => {
    const t = useTranslations("home.features");
    return (
        <div
            className={`relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ${size || ""}`}
        >
            {/* Background Section */}
            <div
                className={`bg-gradient-to-br ${gradient} w-full h-full flex items-center justify-center relative overflow-hidden p-6`}
            >
                <div className={`absolute inset-0 ${effect} blur-3xl`}></div>

                {/* Image */}
                <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-700">
                    <Image
                        src={img}
                        alt={alt}
                        width={imgWidth}
                        height={imgHeight}
                        className="object-contain drop-shadow-2xl"
                    />
                </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-6 inset-inline-start-6 text-white max-w-[280px] z-20">
                <h4
                    className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 bg-gradient-to-r ${textGradient} bg-clip-text text-transparent`}
                >
                    {title}
                </h4>
                <p className="text-sm sm:text-base text-gray-200 mb-3 leading-relaxed">
                    {description}
                </p>
                <Link
                    href="#"
                    className={`inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/50 ${linkColor} transition-all duration-300 group/link`}
                >
                    {t("shop_now")}
                    <svg
                        className="w-4 h-4 transform group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};