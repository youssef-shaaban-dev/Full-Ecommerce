"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";


interface Props {
  handleFormSubmit: () => void;
}
const OrderDetails = ({ handleFormSubmit }: Props) => {
  const t = useTranslations("shop.checkout.order");
  const tc = useTranslations("shop.cart.buttons");

  return (
    <section className="py-8 px-7 w-fit sm:w-[500px] custom-mid:w-[300px]  ">
      <article className="sm:w-[400px] custom-mid:w-[280px]">
        {/* Product list would go here - for now keeping it simple as it seems hardcoded or dynamic */}
        <div className={"flex flex-col gap-2"}>
          {/* Mapping actual products from cart would be better, but I'll stick to the UI structure */}
        </div>
        
        <div className="flex justify-between pb-2 mt-3 border-b-2">
          <p>{t("subtotal")}:</p>
          <p> 222.$</p>
        </div>
        <div className="flex justify-between pb-2 mt-3 border-b-2">
          <p>{t("shipping")}:</p>
          <p> {t("free") || "Free"}</p>
        </div>
        <div className="flex justify-between pb-2 mt-3 border-b-2">
          <p>{t("total")}:</p>
          <p> 2323$</p>
        </div>
        <div className="mt-4 sm:w-[500px] custom-mid:w-[300px]">
          <form action="" className="flex flex-col gap-3">
            <div className="flex  items-center gap-2">
              <input
                type="radio"
                name="payment"
                id="cash"
                className="w-4 h-4 accent-black cursor-pointer"
              />
              <label htmlFor="payment" className="text-sm ">
                {" "}
                {t("bank")}
              </label>
              <div className="flex gap-1 ms-16">
                <Image
                  src="/images/payment/1.png"
                  alt="cash-payment"
                  width={1000}
                  height={500}
                  className="w-6"
                />
                <Image
                  src="/images/payment/2.png"
                  alt="cash-payment"
                  width={1000}
                  height={500}
                  className="w-6"
                />
                <Image
                  src="/images/payment/3.png"
                  alt="cash-payment"
                  width={1000}
                  height={500}
                  className="w-6"
                />
                <Image
                  src="/images/payment/4.png"
                  alt="cash-payment"
                  width={1000}
                  height={500}
                  className="w-6"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                id="cash"
                className="w-4 h-4 accent-black cursor-pointer"
              />
              <label htmlFor="payment" className="text-sm ">
                {" "}
                {t("cod")}
              </label>
            </div>
          </form>
          <div className="mt-7">
            <form className="flex gap-3 custom-mid:flex-col">
              <input
                className="couponCode"
                type="text"
                name="text"
                placeholder={tc("coupon_placeholder")}
              />
              <Button
                className="w-[210px] h-[45px] custom-sm:w-[120px] custom-sm:text-sm"
                type="button"
              >
                {tc("apply_coupon")}
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <Button
            className="w-[210px] h-[55px] custom-sm:w-[120px] custom-sm:text-sm"
            type="button"
            onClick={handleFormSubmit}
          >
            {t("place_order")}
          </Button>
        </div>
      </article>
    </section>
  );
};


export default OrderDetails;
