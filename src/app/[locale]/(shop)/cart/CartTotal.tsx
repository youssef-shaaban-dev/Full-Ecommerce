import React from "react";
import { useTranslations } from "next-intl";

type CartTotalProps = {
  total: number;
}

const CartTotal = ({total}: CartTotalProps) => {
  const t = useTranslations("shop.cart.summary");

  return (
    <>
      <div className="flex justify-between pb-2 mt-3 border-b-2">
        <p>{t("subtotal")}:</p>
        <p> ${total.toFixed(2)}</p>
      </div>
      <div className="flex justify-between pb-2 mt-3 border-b-2">
        <p>{t("shipping")}:</p>
        <p> {t("free")}</p>
      </div>
      <div className="flex justify-between pb-2 mt-3 border-b-2">
        <p>{t("total")}:</p>
        <p> ${total.toFixed(2)}</p>
      </div>
    </>
  );
};


export default CartTotal;
