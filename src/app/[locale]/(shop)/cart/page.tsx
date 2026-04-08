"use client";

import CartRow from "./CartRow";
import CartHeadRow from "./CartHeadRow";
import CartTotal from "./CartTotal";
import PathLinks from "@/components/common/PathLinks";
import { useCartStore } from "@/stores/cart/cartStore";
import AsyncAddToCart from "@/services/Cart/AsyncAddToCart";
import {Link} from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";


const CartPage = () => {
  const cartItems = useCartStore((state) => state.cart);
  const total = cartItems.reduce(
    (acc, cartItem) => acc + (cartItem.subtotal || 0),
    0
  );

  const handleUpdateCart = () => {
    cartItems.map((cartItem) => {
      AsyncAddToCart({
        ProductId: cartItem.product.productId,
        quantity: cartItem.quantity ?? 1,
      });
    });
  };

  const t = useTranslations("shop.cart");

  return (
    <div className="my-28 mx-auto w-[80%] custom-mid:w-[90%] custom-sm:w-[98%]">
      <div className="flex gap-2 m-0 pb-10 text-slate-400">
        <PathLinks titles={[t("title")]} />
      </div>
      <div>
        <table className="border-separate w-full border-spacing-y-[35px] table-fixed">
          <thead className="mb-10">
            <CartHeadRow />
          </thead>
          <tbody>
            <CartRow cartItems={cartItems} />
          </tbody>
        </table>
        <div className="flex justify-between">
          <Button variant="outline" className="px-10 h-10 border-black rounded-[3px]">
            {t("buttons.return")}
          </Button>
          <Button variant="outline" className="px-10 h-10 border-black rounded-[3px]" onClick={handleUpdateCart}>
            {t("buttons.update")}
          </Button>
        </div>
      </div>
      <div className="mt-16 flex justify-between tab-large-screen:flex-col tab-large-screen:gap-4 tab-large-screen:place-items-center">
        <div>
          <form className="flex gap-3">
            <input
              className="border border-black px-4 py-2 rounded-[3px] outline-none w-full sm:w-[300px]"
              type="text"
              name="text"
              placeholder={t("buttons.coupon_placeholder")}
            />
            <Button className="w-[210px] h-[55px] custom-sm:w-[120px] custom-sm:text-sm" type="submit">
              {t("buttons.apply_coupon")}
            </Button>
          </form>
        </div>
        <div className="border-2 border-black py-5 px-7 w-[470px] custom-sm:w-[300px] text-center  ">
          <h2 className="my-1 text-start rtl:text-end">{t("summary.title")}</h2>
          <CartTotal total={total} />
          <Link href="/checkout">
            <Button className="text-[12px] py-2 px-7 !mt-4 ">
              {t("buttons.checkout")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default CartPage;
