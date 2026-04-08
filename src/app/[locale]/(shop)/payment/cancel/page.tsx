"use client";
import { useEffect } from "react";
import { useCancelPayment } from "@/hooks/payment/useCancelPayment";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PaymentCancel = () => {
  const t = useTranslations("shop.payment.cancel");
  const { mutate: cancelPaymentMutate } = useCancelPayment();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("sessionId");
    console.log("Session ID:", sessionId);

    if (sessionId) {
      cancelPaymentMutate(sessionId);
    } else {
      console.log("No session ID provided.");
    }
  }, [searchParams, cancelPaymentMutate]);

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{t("title")}</h1>
        <p className="text-gray-600 mb-6">{t("desc")}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            {t("retry")}
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

export default PaymentCancel;