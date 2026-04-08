"use client";

import { useState } from "react";
import SuggestionProducts from "./SuggestionProducts";
import { useWishListStore } from "@/stores/wishlist/WishListStore";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/common/products/ProductCard";
import { useCartStore } from "@/stores/cart/cartStore";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

import { useTranslations, useLocale } from "next-intl";

const WishListPage = () => {
  const [showAll, setShowAll] = useState(false);
  const t = useTranslations("shop.wishlist");
  const locale = useLocale();

  // Stores
  const { clearWishList, wishList: wishListItems } = useWishListStore((state) => state);
  const { addToCart } = useCartStore((state) => state);

  if (!wishListItems) return <SectionSkeleton />;

  const visibleProducts = showAll ? wishListItems : wishListItems.slice(0, 4);

  const moveAllToCart = async () => {
    for (const item of wishListItems) {
      await addToCart({
        product: item.product,
        quantity: 1,
      });
    }

    clearWishList();
  };

  return (
    <section className="flex flex-col gap-16 my-16 mx-auto w-[90%] max-w-7xl" key={locale}>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-medium">
          {t("title")} <span className="text-primary-red font-semibold">({wishListItems.length})</span>
        </h3>
        <Button 
          variant="outline" 
          onClick={moveAllToCart}
          className="px-10 h-10 border-black rounded-[3px] hover:bg-black hover:text-white transition-all"
        >
          {t("move_all")} 🛒
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((wishlistItem, index) => (
          <ProductCard key={index} product={wishlistItem.product} mode="wishlist" />
        ))}
      </div>

      {!showAll && wishListItems.length > 4 && (
        <div className="flex justify-center">
          <Button
            onClick={() => setShowAll(true)}
            className="w-[170px] h-14"
          >
            {t("see_all")}
          </Button>
        </div>
      )}

      <SuggestionProducts />
    </section>
  );
};

export default WishListPage;
