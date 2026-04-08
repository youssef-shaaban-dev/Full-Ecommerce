"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PaymentSuccess = () => {
  const t = useTranslations("shop.payment.success");

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t("title")}</h1>
        <p className="text-gray-600 mb-6">{t("desc")}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            {t("continue")}
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            {t("home")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;