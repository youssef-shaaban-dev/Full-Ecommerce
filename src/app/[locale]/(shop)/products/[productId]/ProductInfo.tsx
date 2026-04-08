"use client";
import React, { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { Product } from "@/types/cart/Product";
import { useWishListStore } from "@/stores/wishlist/WishListStore";
import { useCartStore } from "@/stores/cart/cartStore";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { useTranslations } from "next-intl";

const sizes = ["XS", "S", "M", "L", "XL"];

const ProductInfo = ({ product }: { product: Product }) => {
  const t = useTranslations("product.details");
  const [selectSize, setSelectSize] = useState("M");

  // State management for quantity
  const store = useCartStore();

  const updateQuantity = useMemo(() => store.updateQuantity, [store]);

  // Cart management
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cart);
  const currentItem = cartItems.find((item) => item.product.productId === product.productId);
  const isInCart = useMemo(
    () => cartItems.some((item) => item.product.productId === product.productId),
    [cartItems, product.productId]
  );

  // Wishlist management
  const addToWishList = useWishListStore((state) => state.addToWishList);
  const wishList = useWishListStore((state) => state.wishList);
  const isInWishList = useMemo(
    () => wishList.some((item) => item.product.productId === product.productId),
    [wishList, product.productId]
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-black">
        {product.name}
      </h1>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 w-4 h-4" />
          ))}
          <CiStar className="text-gray-300 w-4 h-4" />
        </div>
        <span className="text-gray-500 text-sm">(150 {t("reviews")})</span>
        <div className="w-px h-4 bg-gray-300"></div>
        <span className="text-green-500 text-sm">{t("stock")}</span>
      </div>

      {/* Price */}
      <div className="text-2xl font-normal text-black">
        ${product.price}
      </div>

      {/* Description */}
      <div className="text-sm text-black leading-relaxed">
        {product.shortDescription}
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-black text-lg">{t("color")}</span>
          <div className="flex gap-2">
            <button className="w-5 h-5 bg-blue-500 rounded-full border-2 border-gray-300 focus:border-black"></button>
            <button className="w-5 h-5 bg-red-500 rounded-full border-2 border-black"></button>
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-black text-lg">{t("size")}</span>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectSize(size)}
                className={`w-8 h-8 border text-sm font-medium ${selectSize === size
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-black border-gray-300 hover:border-gray-500"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity and Buttons */}
      <div className="flex items-center gap-4">
        {/* Quantity */}
        {currentItem && (
        <div className="flex items-center border border-gray-300">
          <button
            onClick={() =>
              currentItem.quantity && currentItem.quantity > 1
                ? updateQuantity(
                  currentItem.product.productId,
                  currentItem.quantity - 1
                )
                : null
            }
            className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100"
          >
            -
          </button>
          <span className="w-12 h-8 flex items-center justify-center text-black border-inline border-gray-300">
            {currentItem.quantity}
          </span>
          <button
            onClick={() =>
              updateQuantity(
                currentItem.product.productId,
                (currentItem.quantity ?? 1) + 1
              )
            }
            className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100"
          >
            +
          </button>
        </div>
        )}

        {/* Buy Now Button */}
        <Button onClick={() => !isInCart && addToCart({ product, quantity: 1 })}
          disabled={isInCart} variant='secondary' className="px-12 h-11">
          {isInCart ? "Added" : t("buy_now")}
        </Button>

        {/* Wishlist */}
        <Button
          size="icon"
          variant="secondary"
          onClick={() => !isInWishList && addToWishList(product)}
          disabled={isInWishList}
          className={` p-1.5 transition w-11 h-11 border border-gray-300 flex items-center justify-center hover:bg-gray-100 ${isInWishList
            ? "bg-[#DB4444] text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
        >
          <Heart size={30} />
        </Button>
      </div>

      {/* Delivery Info */}
      <div className="border border-gray-300 space-y-0">
        {/* Free Delivery */}
        <div className="flex gap-4 items-center p-4 border-b border-gray-300">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 16V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1m8-1a1 1 0 0 1 1 1H9m4-1V8a1 1 0 0 1 1-1h2.586a1 1 0 0 1 .707.293l1.414 1.414a1 1 0 0 1 .293.707V16a1 1 0 0 1-1 1h-1m-6 0a1 1 0 0 1 1 1H9m0 0H5m4 0h2m4-8h2m-6-4h2.5" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-black">{t("free_delivery")}</div>
            <div className="text-sm text-black underline">{t("delivery_desc")}</div>
          </div>
        </div>

        {/* Return Delivery */}
        <div className="flex gap-4 items-center p-4">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-black">{t("return_delivery")}</div>
            <div className="text-sm text-black">{t("return_desc")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductInfo;